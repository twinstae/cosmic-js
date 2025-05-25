import { Hono } from "hono";
import * as v from "valibot";
import FakeBatchUnitOfWork from "../../persistence/FakeBatchUnitOfWork";
import FakeBatchRepo from "../../persistence/FakeBatchRepo";
import * as batchServices from "../../service/BatchServices";
import { prettyJSON } from "hono/pretty-json";
import { simpleRoute } from "./openapiUtils";
import { vValidator } from "@hono/valibot-validator";
import { batchDto, orderLineDto } from "../../schema/valibot/batch";
import { describeRoute, openAPISpecs } from "hono-openapi";

const app = new Hono();

// app.use('*', logger())
const repo = FakeBatchRepo();

app.get(
	"/batches",
	simpleRoute({
		res: v.object({
			batchList: v.array(batchDto),
		}),
	}),
	async (c) => {
		const batchList = await repo.list();
		return c.json({ batchList });
	},
);

app.post(
	"/batches",
	simpleRoute({
		res: v.object({
			batchId: batchDto.entries.id,
		}),
	}),
	vValidator("json", batchDto),
	async (c) => {
		const batch = c.req.valid("json");
		await repo.add(batch);

		return c.json({ batchId: batch.id });
	},
);

app.post(
	"/batches/allocate",
	simpleRoute({
		res: v.object({
			batchId: batchDto.entries.id,
		}),
	}),
	vValidator("json", orderLineDto),
	async (c) => {
		const line = c.req.valid("json");

		const uow = FakeBatchUnitOfWork(repo);
		const batchId = await batchServices.allocate(line, uow);

		return c.json({ batchId });
	},
);

app.get(
	"/batches/allocations/:orderId",
	simpleRoute({
		res: v.object({ batch: batchDto }),
	}),
	vValidator(
		"param",
		v.object({
			orderId: v.string(),
		}),
	),
	async (c) => {
		const { orderId } = c.req.param();

		const batch = await repo.findBatchForOrderLine(orderId);

		if (batch === undefined) {
			return new Response(`NOT FOUND: ${c.req.url.toString()}`, {
				status: 404,
			});
		}

		return c.json({ batch });
	},
);

app.notFound(async (c) => {
	return new Response(`NOT FOUND: ${c.req.url.toString()}`, {
		status: 404,
	});
});

app.onError((error, c) => {
	if (error instanceof Error) {
		return new Response(error.message, {
			status: 500,
		});
	}

	return new Response(String(error), {
		status: 500,
	});
});

app.get(
	"/openapi",
	openAPISpecs(app, {
		documentation: {
			info: {
				title: "Cosmic Js API",
				version: "1.0.0",
				description: "재고 관리 시스템",
			},
			servers: [{ url: "http://localhost:3000", description: "Local Server" }],
		},
	}),
);

app.get(
	"/redoc",
	describeRoute({
		responses: {
			200: {
				content: {
					"text/html": {
						schema: v.string(),
					},
				},
				description: "redoc.html",
			},
		},
	}),
	async (c) => {
		return await Bun.file("./src/api/fets/redoc.html").text().then(c.html);
	},
);

app.use("/openapi.json/*", prettyJSON());
export default app;
