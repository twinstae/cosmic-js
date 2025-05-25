import { expect, it } from "bun:test";
import { BATCH, ORDER_LINE } from "../domain/fixtures";

export function runTestScenario(
	implName: string,
	client: {
		get: (path: string) => Promise<unknown>;
		post: (path: string, data: string | object) => Promise<Response>;
	},
) {
	it(implName, async () => {
		const before = await client.get("/batches");

		expect(before).toStrictEqual({
			batchList: [],
		});

		await client.post("/batches", BATCH);

		const after = await client.get("/batches");

		expect(after).toStrictEqual({
			batchList: [BATCH],
		});

		await client.post("/batches/allocate", ORDER_LINE);

		const batch = await client.get(
			"/batches/allocations/" + ORDER_LINE.orderId,
		);

		const final = await client.get("/batches");

		expect(final).toStrictEqual({
			batchList: [
				{
					...BATCH,
					allocations: [ORDER_LINE],
				},
			],
		});

		expect(batch).toStrictEqual({
			batch: {
				...BATCH,
				allocations: [ORDER_LINE],
			},
		});
	});
}
