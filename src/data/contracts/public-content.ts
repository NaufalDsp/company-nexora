import { z } from "zod";
import type { Portfolio, Project } from "./portfolio";

export const serviceIconSchema = z.enum([
  "armchair",
  "building",
  "house",
  "layers",
  "pen-tool",
  "store",
  "workflow",
]);

export const serviceSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  shortDescription: z.string().min(1),
  icon: serviceIconSchema,
});

export const processStepSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
});

const internalHrefSchema = z
  .string()
  .refine((href) => href.startsWith("#") || href.startsWith("/"));

export const landingPageContentSchema = z.object({
  conceptNotice: z.string().min(1),
  hero: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    highlightedTitle: z.string().min(1),
    description: z.string().min(1),
    primaryCtaLabel: z.string().min(1),
    primaryCtaHref: internalHrefSchema,
    secondaryCtaLabel: z.string().min(1),
    secondaryCtaHref: internalHrefSchema,
    capabilities: z
      .array(
        z.object({
          label: z.string().min(1),
          value: z.string().min(1),
        }),
      )
      .length(3),
  }),
  about: z.object({
    label: z.string().min(1),
    title: z.string().min(1),
    paragraphs: z.array(z.string().min(1)).min(1),
    principles: z.array(z.string().min(1)).min(1),
  }),
  services: z.array(serviceSchema).min(1),
  process: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    steps: z.array(processStepSchema).min(1),
  }),
  consultation: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    ctaLabel: z.string().min(1),
    ctaHref: internalHrefSchema,
  }),
});

export type ServiceIconName = z.infer<typeof serviceIconSchema>;
export type Service = z.infer<typeof serviceSchema>;
export type LandingPageContent = z.infer<typeof landingPageContentSchema>;

export type PublicContentRepository = {
  getLandingPageContent: () => Promise<LandingPageContent>;
  getPortfolio: () => Promise<Portfolio>;
  getProjectBySlug: (slug: string) => Promise<Project | null>;
};
