import { z, defineCollection } from 'astro:content';

const substrateCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    module: z.number(),
  }),
});

export const collections = {
  substrate: substrateCollection,
};
