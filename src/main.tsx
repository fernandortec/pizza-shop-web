import { enableMSW } from "@/api/mocks";
import { App } from "@/app";
import React from "react";
import ReactDOM from "react-dom/client";

enableMSW().then(() => {
	// biome-ignore lint/style/noNonNullAssertion:
	ReactDOM.createRoot(document.getElementById("root")!).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	);
});
