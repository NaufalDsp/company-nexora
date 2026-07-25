import { z } from "zod";

const publicEnvironmentSchema = z
  .object({
    VITE_DATA_MODE: z.enum(["mock", "supabase"]).default("mock"),
    VITE_SITE_URL: z.url().default("http://localhost:5173"),
    VITE_SUPABASE_URL: z.string().optional(),
    VITE_SUPABASE_PUBLISHABLE_KEY: z.string().optional(),
  })
  .superRefine((environment, context) => {
    if (environment.VITE_DATA_MODE !== "supabase") {
      return;
    }

    if (!environment.VITE_SUPABASE_URL) {
      context.addIssue({
        code: "custom",
        message: "VITE_SUPABASE_URL wajib diisi pada mode Supabase.",
        path: ["VITE_SUPABASE_URL"],
      });
    }

    if (!environment.VITE_SUPABASE_PUBLISHABLE_KEY) {
      context.addIssue({
        code: "custom",
        message:
          "VITE_SUPABASE_PUBLISHABLE_KEY wajib diisi pada mode Supabase.",
        path: ["VITE_SUPABASE_PUBLISHABLE_KEY"],
      });
    }
  });

export type PublicEnvironment = {
  dataMode: "mock" | "supabase";
  siteUrl: string;
  supabaseUrl?: string;
  supabasePublishableKey?: string;
};

export function readPublicEnvironment(
  values: Record<string, unknown>,
): PublicEnvironment {
  const environment = publicEnvironmentSchema.parse(values);

  return {
    dataMode: environment.VITE_DATA_MODE,
    siteUrl: environment.VITE_SITE_URL,
    ...(environment.VITE_SUPABASE_URL
      ? { supabaseUrl: environment.VITE_SUPABASE_URL }
      : {}),
    ...(environment.VITE_SUPABASE_PUBLISHABLE_KEY
      ? {
          supabasePublishableKey: environment.VITE_SUPABASE_PUBLISHABLE_KEY,
        }
      : {}),
  };
}
