import { createEffect, createRoot } from 'solid-js';
import { createStore } from 'solid-js/store';
import { getCollection } from 'astro:content';
import { groupEntriesByModule } from '../helpers';

const substrateCourseEntries = await getCollection('substrate');
const entriesByModule = groupEntriesByModule(substrateCourseEntries);
const startingChecklist = entriesByModule.map((module) =>
  module.map((entry) =>
    Object.fromEntries(
      (entry.data.checklist ?? ['default']).map((_, index) => [index, false])
    )
  )
);
const startingQuiz = entriesByModule.map((module) =>
  module.map((entry) =>
    Object.fromEntries((entry.data.quiz ?? []).map((_, index) => [index, 0]))
  )
);

type EntryCheckbox = { [k: number]: boolean };
type ModuleCheckbox = EntryCheckbox[];

type EntryRadio = { [k: number]: number };
type ModuleRadio = EntryRadio[];

export interface Progress {
  substrate: {
    checklist: ModuleCheckbox[];
    quiz: ModuleRadio[];
  };
  ink: {
    checklist: ModuleCheckbox[];
    quiz: ModuleRadio[];
  };
  rust: {
    checklist: ModuleCheckbox[];
    quiz: ModuleRadio[];
  };
}

const createProgress = () => {
  const [progress, setProgress] = createStore<Progress>({
    substrate: {
      checklist: startingChecklist,
      quiz: startingQuiz,
    },
    ink: {
      checklist: startingChecklist,
      quiz: startingQuiz,
    },
    rust: {
      checklist: startingChecklist,
      quiz: startingQuiz,
    },
  });

  createEffect(() => {
    const startingProgress = window.localStorage.getItem('progress');
    if (startingProgress) {
      setProgress(JSON.parse(startingProgress));
    }
  });

  return { progress, setProgress };
};

export default createRoot(createProgress);
