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

    console.log(splitModule);

    const moduleNumber = Number(splitModule[0]);
    const moduleName = splitModule?.[1] ?? `Módulo ${moduleNumber}`;

    console.log('Nombre: ', moduleName);
    
    if (accumulator[moduleNumber]) {
      accumulator[moduleNumber].entries.push(entry);
    } else {
      accumulator[moduleNumber] = { name: moduleName, entries: [entry] };
    }
    return accumulator;
  }, []);
};
