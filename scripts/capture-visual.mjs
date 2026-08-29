import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import net from "node:net";

const label = process.argv[2];
const baseUrl = process.env.BASE_URL || "http://127.0.0.1:3000";
const password = process.env.SITE_PASSWORD || "land2expand";

if (!label) {
  throw new Error("Usage: node scripts/capture-visual.mjs <label>");
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function openPort() {
  const server = net.createServer();
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  const port = typeof address === "object" && address ? address.port : 0;
  await new Promise((resolve) => server.close(resolve));
  return port;
}

async function waitForJson(url) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
    } catch {}
    await delay(100);
  }
  throw new Error(`Chrome did not start at ${url}`);
}

class Cdp {
  constructor(url) {
    this.nextId = 1;
    this.pending = new Map();
    this.listeners = new Map();
    this.socket = new WebSocket(url);
    this.socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(message.error.message));
        else pending.resolve(message.result);
        return;
      }
      const listeners = this.listeners.get(message.method) || [];
      this.listeners.delete(message.method);
      for (const listener of listeners) listener(message.params);
    });
  }

  async connect() {
    if (this.socket.readyState === WebSocket.OPEN) return;
    await new Promise((resolve, reject) => {
      this.socket.addEventListener("open", resolve, { once: true });
      this.socket.addEventListener("error", reject, { once: true });
    });
  }

  send(method, params = {}) {
    const id = this.nextId;
    this.nextId += 1;
    this.socket.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
    });
  }

  once(method, timeoutMs = 10000) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(
        () => reject(new Error(`Timed out waiting for ${method}`)),
        timeoutMs,
      );
      const listeners = this.listeners.get(method) || [];
      listeners.push((params) => {
        clearTimeout(timer);
        resolve(params);
      });
      this.listeners.set(method, listeners);
    });
  }

  close() {
    this.socket.close();
  }
}

async function main() {
  const outputDir = new URL(`../.visual/${label}/`, import.meta.url);
  await mkdir(outputDir, { recursive: true });

  const port = await openPort();
  const chrome = spawn(
    "google-chrome",
    [
      "--headless=new",
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--hide-scrollbars",
      `--remote-debugging-port=${port}`,
      "--user-data-dir=/tmp/synechron-visual-chrome",
      "about:blank",
    ],
    { stdio: "ignore" },
  );

  try {
    await waitForJson(`http://127.0.0.1:${port}/json/version`);
    const page = await fetch(
      `http://127.0.0.1:${port}/json/new?about:blank`,
      { method: "PUT" },
    ).then((response) => response.json());
    const cdp = new Cdp(page.webSocketDebuggerUrl);
    await cdp.connect();
    await cdp.send("Page.enable");
    await cdp.send("Network.enable");

    async function setViewport(width, height, mobile = false) {
      await cdp.send("Emulation.setDeviceMetricsOverride", {
        width,
        height,
        deviceScaleFactor: 1,
        mobile,
      });
    }

    async function navigate(path) {
      const loaded = cdp.once("Page.loadEventFired");
      await cdp.send("Page.navigate", { url: `${baseUrl}${path}` });
      await loaded;
      await delay(700);
    }

    async function evaluate(expression) {
      return cdp.send("Runtime.evaluate", {
        expression,
        awaitPromise: true,
        returnByValue: true,
      });
    }

    async function screenshot(name) {
      const result = await cdp.send("Page.captureScreenshot", {
        format: "png",
        fromSurface: true,
        captureBeyondViewport: false,
      });
      await writeFile(
        new URL(`${name}.png`, outputDir),
        Buffer.from(result.data, "base64"),
      );
    }

    await setViewport(1440, 900);
    await navigate("/login");
    await screenshot("login-desktop");

    const login = await fetch(`${baseUrl}/api/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password, next: "/" }),
      redirect: "manual",
    });
    const cookie = login.headers.get("set-cookie")?.split(";")[0];
    if (!cookie || !login.ok) {
      throw new Error(`Login failed with ${login.status}`);
    }
    const separator = cookie.indexOf("=");
    await cdp.send("Network.setCookie", {
      name: cookie.slice(0, separator),
      value: cookie.slice(separator + 1),
      url: baseUrl,
    });

    await navigate("/");
    await screenshot("hero-desktop");
    await evaluate(
      "document.querySelector('#jobs')?.scrollIntoView({block:'start'});",
    );
    await delay(500);
    await screenshot("first-use-case-desktop");

    await setViewport(390, 844, true);
    await navigate("/");
    await screenshot("hero-mobile");
    await evaluate(
      "document.querySelector('#jobs')?.scrollIntoView({block:'start'});",
    );
    await delay(500);
    await screenshot("first-use-case-mobile");
    cdp.close();
  } finally {
    chrome.kill("SIGTERM");
  }
}

await main();
