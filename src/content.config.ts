import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "*.(md|mdx)", base: "./content/posts" }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { posts };
