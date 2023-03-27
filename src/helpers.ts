import type {
  CourseEntries,
  CourseEntriesByModule,
} from './data/courseEntries';

export const groupEntriesByModule = (
  courseEntries: CourseEntries
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
