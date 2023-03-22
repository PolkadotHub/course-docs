import type { CollectionEntry } from 'astro:content';

type CourseEntriesByModule = CollectionEntry<'substrate'>[][];

export const groupEntriesByModule = (
  courseEntries: CollectionEntry<'substrate'>[]
): CourseEntriesByModule => {
  return courseEntries.reduce((accumulator: CourseEntriesByModule, entry) => {
    const [module, _] = entry.id.split('/');
    const moduleNumber = Number(module);
    if (accumulator[moduleNumber]) {
      accumulator[moduleNumber].push(entry);
    } else {
      accumulator[moduleNumber] = [entry];
    }
    return accumulator;
  }, []);
};
