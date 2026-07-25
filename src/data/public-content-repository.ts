import type { PublicContentRepository } from "./contracts/public-content";
import { MockPublicContentRepository } from "./mock/mock-public-content-repository";
import { readPublicEnvironment } from "../lib/env/public-environment";

const environment = readPublicEnvironment(import.meta.env);

export function getPublicContentRepository(): PublicContentRepository {
  if (environment.dataMode === "mock") {
    return new MockPublicContentRepository();
  }

  throw new Error(
    "Adapter Supabase belum tersedia. Gunakan VITE_DATA_MODE=mock sampai milestone backend.",
  );
}

export function getPublicDataMode() {
  return environment.dataMode;
}
