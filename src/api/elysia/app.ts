import { Elysia, t } from "elysia";
import batchGroup from "./batch";
import swagger from "@elysiajs/swagger";

const app = new Elysia()
	.use(
		swagger({
			path: "/docs",
		}),
	)
	.get("/", () => "Hello Elysia")
	.use(batchGroup)
	.get("/redoc", () =>
		Bun.file("./src/api/elysia/redoc.html")
			.text()
			.then(
				(html) =>
					new Response(html, {
						headers: {
							"Content-Type": "text/html",
						},
					}),
			),
	)
	.onError(({ code, error, request }) => {
		if (code === 'INTERNAL_SERVER_ERROR' || code === 'UNKNOWN') {

		return new Response(`${code}: ${error.message}`, {
			status: 500
		});
		}

		if (code === 'NOT_FOUND') {
			
		return new Response(`${code}: ${request.url.toString()}`, {
			status: 404
		});
		}

		if (code === 'PARSE'){
			return new Response(`${code}: ${error.message}`, {
			status: 422
		});
		}

		
		if (code === 'VALIDATION') {
			
		return new Response(`${code}: ${error.message}`, {
			status: 400
		});
		}

		return new Response(`${code}: ${error.toString()}`, {
			status: 400
		});
	});

export default app;
