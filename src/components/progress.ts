import { createEffect, createRoot } from 'solid-js';
import { createStore } from 'solid-js/store';
import { getCollection } from 'astro:content';
import { groupEntriesByModule } from '../utils/groupEntries';
import { Track } from '../data/tracks';

const getStartingValues = async (collection: Track) => {
  const courseEntries = await getCollection(collection);
  const entriesByModule = groupEntriesByModule(courseEntries);
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

  return { checklist: startingChecklist, quiz: startingQuiz };
}

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

const createProgress = async () => {
  const [progress, setProgress] = createStore<Progress>({
    substrate: await getStartingValues(Track.Substrate),
    ink: await getStartingValues(Track.Ink),
    rust: await getStartingValues(Track.Rust),
  });

  createEffect(() => {
    const startingProgress = window.localStorage.getItem('progress');
    if (startingProgress) {
      setProgress(JSON.parse(startingProgress));
    }
  });

  return { progress, setProgress };
};

export default await createProgress();
