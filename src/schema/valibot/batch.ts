import * as v from "valibot";
import { ORDER_LINE, BATCH } from "../../domain/fixtures";

export const orderLineDto = v.pipe(
	v.object({
		orderId: v.string(),
		sku: v.string(),
		quantity: v.number(),
	}),
	v.description("주문의 개별 항목"),
	v.metadata({
		title: "OrderLine",
		exmaples: [ORDER_LINE],
	}),
);

export const batchDto = v.pipe(
	v.object({
		id: v.string(),
		sku: v.string(),
		quantity: v.number(),
		eta: v.union([v.number(), v.null()]),
		allocations: v.array(orderLineDto),
	}),
	v.description("재고와 재고에 할당된 주문 항목 현황"),
	v.metadata({
		title: "Batch",
		exmaples: [BATCH],
	}),
);
