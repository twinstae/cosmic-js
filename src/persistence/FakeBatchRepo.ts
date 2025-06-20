import type * as Batch from "../domain/Batch";
import type { BatchRepo } from "./types";

function FakeBatchRepo(): BatchRepo {
	let _batches: Batch.Type[] = [];

	return {
		async add(batch: Batch.Type) {
			if (_batches.some((item) => item.id === batch.id)) {
				throw Error("already exist");
			}

			_batches = [..._batches, structuredClone(batch)];
		},
		async allocate(batchId, line) {
			const batch = _batches.find((item) => item.id === batchId);
			if (batch === undefined) {
				throw Error("does not exist");
			}
			batch.allocations.push(structuredClone(line));
		},
		async get(batchId: string) {
			const batch = _batches.find((item) => item.id === batchId);
			if (batch === undefined) {
				return undefined;
			}
			return batch;
		},
		async findBatchForOrderLine(orderId: string) {
			const batch = _batches.find((item) =>
				item.allocations.some((allocation) => allocation.orderId === orderId),
			);
			if (batch === undefined) {
				return undefined;
			}
			return batch;
		},
		async list() {
			return _batches;
		},
	};
}

export default FakeBatchRepo;
