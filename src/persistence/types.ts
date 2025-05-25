import * as Batch from "../domain/Batch";

export interface BatchRepo {
	add(batch: Batch.Type): Promise<void>;
	findBatchForOrderLine(
		orderId: Batch.OrderLine["orderId"],
	): Promise<Batch.Type>;
	get(id: Batch.Type["id"]): Promise<Batch.Type>;
	allocate(id: Batch.Type["id"], orderLine: Batch.OrderLine): Promise<void>;

	list(): Promise<Batch.Type[]>;
}

export interface BatchUnitOfWork {
	repo: BatchRepo;
	commit(): Promise<void>;
	rollback(): Promise<void>;
}
