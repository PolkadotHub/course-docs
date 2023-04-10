import type {
  CourseEntries,
  ModuleWithEntries,
} from '../types/courseEntries';

export const groupEntriesByModule = (
  courseEntries: CourseEntries
): ModuleWithEntries => {
  return courseEntries.reduce((accumulator: ModuleWithEntries, entry) => {
    const [module, _] = entry.id.split('/');

    const splitModule = module.split('-');

    const moduleNumber = Number(splitModule[0]);
    const moduleName = splitModule?.[1] ?? `Módulo ${moduleNumber}`;

    if (accumulator[moduleNumber]) {
      accumulator[moduleNumber].entries.push(entry);
    } else {
      accumulator[moduleNumber] = { name: moduleName, entries: [entry] };
    }
    return accumulator;
  }, []);
};
