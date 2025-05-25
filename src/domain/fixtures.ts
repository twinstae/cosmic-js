import * as Batch from "./Batch";

export const BATCH: Batch.Type = {
	id: "batch-001",
	sku: "SMALL-TABLE",
	quantity: 10,
	allocations: [],
	eta: null,
};

export const ORDER_LINE: Batch.OrderLine = {
	orderId: "order-ref",
	sku: "SMALL-TABLE",
	quantity: 2,
};
