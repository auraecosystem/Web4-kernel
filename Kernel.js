import * as React from "https://esm.unpkg.com/react@18.3.1";
import { createRoot } from "https://esm.unpkg.com/react-dom@18.3.1/client";

/* =========================
   WEB4 STATE KERNEL
========================= */
const state = new Proxy(
  {},
  {
    set(obj, key, value) {
      obj[key] = value;
      render(); // auto re-render on state change
      return true;
    },
  }
);

/* =========================
   ROUTER (filesystem-style)
========================= */
const routes = {};

export function route(path, component) {
  routes[path] = component;
}

function resolveRoute() {
  return location.hash.replace("#", "") || "/";
}

/* =========================
   PLUGIN ENGINE
========================= */
const plugins = [];

export function usePlugin(plugin) {
  plugins.push(plugin);
  plugin?.init?.({ state, route, navigate });
}

function initPlugins() {
  plugins.forEach(p => p?.boot?.());
}

/* =========================
   NAVIGATION
========================= */
export function navigate(path) {
  location.hash = path;
}

/* =========================
   REACT RENDERER
========================= */
const root = createRoot(document.getElementById("root"));

function render() {
  const path = resolveRoute();
  const Component = routes[path] || routes["/404"];

  const tree = React.createElement(Component, {
    state,
    navigate,
  });

  root.render(tree);
}

/* =========================
   HMR via WebSocket
========================= */
const socket = new WebSocket("ws://localhost:5170");

socket.onmessage = async (event) => {
  const msg = JSON.parse(event.data);

  if (msg.type === "reload") {
    console.log("⚡ HMR update received");
    await import(msg.module + "?t=" + Date.now());
    render();
  }
};

/* =========================
   REMOTE MODULE LOADER
========================= */
export async function loadRemote(url) {
  return await import(url + "?t=" + Date.now());
}

/* =========================
   INITIAL BOOT
========================= */
function boot() {
  initPlugins();
  render();
}

boot();
