import { z, defineCollection } from 'astro:content';

const substrateCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    module: z.number(),
    checklist: z.array(z.string()).optional(),
  }),
});

const inkCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    module: z.number(),
  }),
});

const rustCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    module: z.number(),
  }),
});

export const collections = {
  substrate: substrateCollection,
  ink: inkCollection,
  rust: rustCollection,
};
