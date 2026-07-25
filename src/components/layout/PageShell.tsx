import type { ReactNode } from "react";

import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { MotionProvider } from "../motion/MotionProvider";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <MotionProvider>
      <a className="skip-link" href="#main-content">
        Lewati ke konten utama
      </a>
      <Navbar />
      {children}
      <Footer />
    </MotionProvider>
  );
}
