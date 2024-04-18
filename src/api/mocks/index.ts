import { env } from "@/env";
import { setupWorker } from "msw/browser";

export const worker = setupWorker();

export async function enableMSW(): Promise<void> {
	if(env.MODE !== "test") return;
	
	await worker.start();
}
