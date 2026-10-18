// Runs a script in a fresh iframe with an opaque origin (sandbox="allow-scripts" only):
// the script cannot reach this page's DOM, storage or cookies. Console output comes back by postMessage.

export type SandboxEvent =
	| { type: "log"; level: string; text: string }
	| { type: "done"; failed?: boolean }
	| { type: "timeout" };

const SANDBOX_HTML = `<!doctype html>
<html><body><script>
(function () {
  const send = (message) => parent.postMessage(message, "*");
  const format = (value) => {
    if (typeof value === "string") return value;
    if (value instanceof Error) return value.stack || String(value);
    try {
      const json = JSON.stringify(value, null, 2);
      return json === undefined ? String(value) : json;
    } catch (error) {
      return String(value);
    }
  };
  ["log", "info", "warn", "error", "debug"].forEach((level) => {
    console[level] = (...args) => send({ type: "log", level, text: args.map(format).join(" ") });
  });
  window.addEventListener("error", (event) => {
    send({ type: "log", level: "error", text: String(event.error || event.message) });
  });
  window.addEventListener("message", async (event) => {
    if (event.source !== parent) return;
    try {
      const run = new Function("return (async () => {\\n" + event.data.code + "\\n})();");
      await run();
      send({ type: "done" });
    } catch (error) {
      send({ type: "log", level: "error", text: String(error && error.stack ? error.stack : error) });
      send({ type: "done", failed: true });
    }
  });
  send({ type: "ready" });
})();
</script></body></html>`;

export function runInSandbox(
	code: string,
	onEvent: (event: SandboxEvent) => void,
	timeoutMs = 5000,
): () => void {
	const iframe = document.createElement("iframe");
	iframe.setAttribute("sandbox", "allow-scripts");
	iframe.style.display = "none";
	iframe.srcdoc = SANDBOX_HTML;

	let finished = false;
	const finish = (): void => {
		if (finished) return;
		finished = true;
		window.removeEventListener("message", onMessage);
		clearTimeout(timer);
		iframe.remove();
	};

	const onMessage = (event: MessageEvent): void => {
		if (event.source !== iframe.contentWindow) return;
		const data = event.data as SandboxEvent | { type: "ready" };
		if (data.type === "ready") {
			iframe.contentWindow?.postMessage({ code }, "*");
			return;
		}
		onEvent(data);
		if (data.type === "done") finish();
	};

	const timer = setTimeout(() => {
		onEvent({ type: "timeout" });
		finish();
	}, timeoutMs);

	window.addEventListener("message", onMessage);
	document.body.appendChild(iframe);
	return finish;
}
