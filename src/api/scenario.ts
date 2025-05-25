import { expect, it } from "bun:test";
import { BATCH, ORDER_LINE } from "../domain/fixtures";

export function runTestScenario(
	implName: string,
	client: {
		get: (path: string) => Promise<unknown>;
		post: (path: string, data: string | object) => Promise<Response>;
	},
) {
	it(`${implName} - 404`, async () => {
		await expect(client.post("/btashec", {})).rejects.toThrow();
	});

	it(`${implName} - validation`, async () => {
		const promise = client.post("/batches", {});
		await expect(promise).rejects.toThrow();
	});

	it(implName, async () => {
		const logs: string[] = [];

		try {
			logs.push("before GET /batches");
			const before = await client.get("/batches");

			expect(before).toStrictEqual({
				batchList: [],
			});

			logs.push("POST /batches");
			await client.post("/batches", BATCH);

			logs.push("after GET /batches");
			const after = await client.get("/batches");

			expect(after).toStrictEqual({
				batchList: [BATCH],
			});

			logs.push("POST /batches/allocate");
			await client.post("/batches/allocate", ORDER_LINE);

			logs.push(
				`after allocate GET /batches/allocations/${ORDER_LINE.orderId}`,
			);
			const batch = await client.get(
				`/batches/allocations/${ORDER_LINE.orderId}`,
			);

			expect(batch).toStrictEqual({
				batch: {
					...BATCH,
					allocations: [ORDER_LINE],
				},
			});

			logs.push("after allocate GET /batches");
			const final = await client.get("/batches");

			expect(final).toStrictEqual({
				batchList: [
					{
						...BATCH,
						allocations: [ORDER_LINE],
					},
				],
			});

			logs.push("End");
		} catch (error) {
			if (error instanceof Error) {
				error.message = `[Logs]\n\n${logs.join("\n")}\n\n[Original Error]\n\n${error.message}`;

				throw error;
			}
		}
	});
}
