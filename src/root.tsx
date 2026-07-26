import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import { PageShell } from "./components/layout/PageShell";
import { INITIAL_LOADER_SESSION_KEY } from "./components/motion/InitialLoader";
import "./styles/global.css";

const loaderSessionBootstrap = `
  let hasSeenLoader = false;

  try {
    hasSeenLoader =
      sessionStorage.getItem(${JSON.stringify(INITIAL_LOADER_SESSION_KEY)}) === "true";
  } catch {}

  const shouldReduceMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (hasSeenLoader || shouldReduceMotion) {
    document.documentElement.dataset.introHidden = "true";
    document.documentElement.dataset.introReady = "true";
  }
`;

export const links = () => [
  {
    rel: "icon",
    href: "/favicon.svg",
    type: "image/svg+xml",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#111210" />
        <script dangerouslySetInnerHTML={{ __html: loaderSessionBootstrap }} />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <PageShell>
      <Outlet />
    </PageShell>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let title = "Terjadi kesalahan";
  let message =
    "Halaman tidak dapat ditampilkan. Silakan kembali ke halaman utama.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    title =
      error.status === 404 ? "Halaman tidak ditemukan" : "Permintaan gagal";
    message =
      error.status === 404
        ? "Alamat yang Anda buka tidak tersedia."
        : error.statusText || message;
  } else if (import.meta.env.DEV && error instanceof Error) {
    message = error.message;
    stack = error.stack;
  }

  return (
    <main className="error-page" id="main-content">
      <div className="container error-page__content">
        <p className="eyebrow">NEXORA SPACE / SYSTEM</p>
        <h1>{title}</h1>
        <p>{message}</p>
        <a className="button button--primary" href="/">
          Kembali ke beranda
        </a>
        {stack ? <pre className="error-page__stack">{stack}</pre> : null}
      </div>
    </main>
  );
}
