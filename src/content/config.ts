import { z, defineCollection } from 'astro:content';

const questionSchema = z.object({
  text: z.string(),
  options: z.array(z.string()),
  correctOption: z.number(),
});

const checklistSchema = z.array(z.string());

const substrateCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    module: z.number(),
    checklist: checklistSchema.optional(),
    quiz: z.array(questionSchema).optional(),
  }),
});

const inkCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    module: z.number(),
    checklist: checklistSchema.optional(),
    quiz: z.array(questionSchema).optional(),
  }),
});

const rustCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    module: z.number(),
    checklist: checklistSchema.optional(),
    quiz: z.array(questionSchema).optional(),
  }),
});

export const collections = {
  substrate: substrateCollection,
  ink: inkCollection,
  rust: rustCollection,
};
