import { router } from "./index";
import { runTestScenario } from "../scenario";

const HOST = "http://localhost:3000";

async function get(path: string) {
	const res = await router.fetch(HOST + path);

	return res.json();
}

async function post(path: string, data: unknown) {
	return router.fetch(HOST + path, {
		method: "post",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
}

runTestScenario("fets api", {
	get,
	post,
});
