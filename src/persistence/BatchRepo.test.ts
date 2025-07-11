import Database from "bun:sqlite";
import { it, expect } from "bun:test";
import type { BatchRepo } from "./types";
import DrizzleSqliteBatchRepo from "./DrizzleSqliteBatchRepo";
import BunSqliteBatchRepo from "./BunSQLiteBatchRepo";
import FakeBatchRepo from "./FakeBatchRepo";
import { BATCH, ORDER_LINE } from "../domain/fixtures";

function testRepo(name: string, setup: () => Promise<BatchRepo>) {
	it(name, async () => {
		const repo = await setup();

		await expect(repo.get(BATCH.id)).resolves.toBe(undefined);
		expect(repo.allocate(BATCH.id, ORDER_LINE)).rejects.toThrow(
			"does not exist",
		);

		expect(await repo.list()).toStrictEqual([]);

		await repo.add(BATCH);
		expect(repo.add(BATCH)).rejects.toThrow("already exist");

		expect(await repo.list()).toStrictEqual([BATCH]);

		await repo.allocate(BATCH.id, ORDER_LINE);

		expect(await repo.get(BATCH.id)).toStrictEqual({
			...BATCH,
			allocations: [ORDER_LINE],
		});

		expect(await repo.findBatchForOrderLine(ORDER_LINE.orderId)).toStrictEqual({
			...BATCH,
			allocations: [ORDER_LINE],
		});
	});
}

testRepo("DrizzleSqliteBatchRepo", async () => {
	const db = new Database(":memory:");

	db.run(
		"CREATE TABLE IF NOT EXISTS batches (id TEXT NOT NULL, sku TEXT NOT NULL, quantity INTEGER NOT NULL, eta INTEGER)",
	);
	db.run(
		"CREATE TABLE IF NOT EXISTS order_lines (order_id TEXT NOT NULL, sku TEXT NOT NULL, quantity INTEGER NOT NULL, batch_id INTEGER)",
	);

	const repo = DrizzleSqliteBatchRepo(db);
	return repo;
});

testRepo("BunSqliteBatchRepo", async () => {
	const db = new Database(":memory:");

	db.run(
		"CREATE TABLE IF NOT EXISTS batches (id TEXT NOT NULL, sku TEXT NOT NULL, quantity INTEGER NOT NULL, eta INTEGER)",
	);
	db.run(
		"CREATE TABLE IF NOT EXISTS order_lines (order_id TEXT NOT NULL, sku TEXT NOT NULL, quantity INTEGER NOT NULL, batch_id INTEGER)",
	);

	const repo = BunSqliteBatchRepo(db);
	return repo;
});

testRepo("FakeBatchRepo", async () => {
	const repo = FakeBatchRepo();
	return repo;
});
