import type * as Batch from "../domain/Batch";

type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

type Prettify2<T> = {
	[K in keyof T]: T extends {
		[key in keyof string]: unknown;
	}
		? Prettify<T[K]>
		: T[K];
} & {};

export interface BatchRepo {
	add(batch: Prettify2<Batch.Type>): Promise<void>;
	findBatchForOrderLine(
		orderId: Batch.OrderLine["orderId"],
	): Promise<Prettify2<Batch.Type> | undefined>;
	get(
		id: Prettify2<Batch.Type>["id"],
	): Promise<Prettify2<Batch.Type> | undefined>;
	allocate(
		id: Prettify2<Batch.Type>["id"],
		orderLine: Batch.OrderLine,
	): Promise<void>;

	list(): Promise<Prettify2<Batch.Type>[]>;
}

export interface BatchUnitOfWork {
	repo: BatchRepo;
	commit(): Promise<void>;
	rollback(): Promise<void>;
}
