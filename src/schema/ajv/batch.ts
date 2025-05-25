import Ajv, { Schema } from "ajv";

const ajv = new Ajv();
export const orderLineJSONSchema = {
	type: "object",
	properties: {
		orderId: { type: "string" },
		sku: { type: "string" },
		quantity: { type: "integer" },
	},
	required: ["orderId", "sku", "quantity"],
	additionalProperties: false,
} satisfies Schema;

export const validateOrderLine = ajv.compile(orderLineJSONSchema);

export const batchJSONSchema = {
	type: "object",
	properties: {
		id: { type: "string" },
		sku: { type: "string" },
		quantity: { type: "integer" },
		eta: { type: "number" },
		allocations: { type: "array", items: orderLineJSONSchema },
	},
	required: ["id", "sku", "quantity", "eta", "allocations"],
	additionalProperties: false,
} satisfies Schema;

export const validateBatch = ajv.compile(batchJSONSchema);
