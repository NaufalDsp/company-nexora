import { z } from "zod";

export const projectCategorySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  slug: z.string().min(1),
});

export const projectImageSchema = z.object({
  id: z.string().min(1),
  src: z.string().startsWith("/"),
  alt: z.string().min(1),
  caption: z.string().min(1).optional(),
});

export const projectSchema = z.object({
  id: z.string().min(1),
  category: projectCategorySchema,
  title: z.string().min(1),
  slug: z.string().min(1),
  location: z.string().min(1),
  completionYear: z.number().int().min(2000),
  areaSize: z.number().positive(),
  summary: z.string().min(1),
  description: z.array(z.string().min(1)).min(1),
  challenge: z.string().min(1),
  solution: z.string().min(1),
  coverImage: projectImageSchema,
  gallery: z.array(projectImageSchema).min(1),
  isFeatured: z.boolean(),
  status: z.literal("published"),
  contentLabel: z.literal("Proyek konsep fiktif"),
});

export const portfolioSchema = z.object({
  categories: z.array(projectCategorySchema).min(1),
  projects: z.array(projectSchema).min(1),
});

export type ProjectCategory = z.infer<typeof projectCategorySchema>;
export type Project = z.infer<typeof projectSchema>;
export type Portfolio = z.infer<typeof portfolioSchema>;
