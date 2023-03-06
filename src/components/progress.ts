import { createEffect, createRoot } from "solid-js";
import { createStore } from "solid-js/store";
import { getCollection } from 'astro:content';
import { groupEntriesByModule } from "../helpers";

const substrateCourseEntries = await getCollection('substrate');
const entriesByModule = groupEntriesByModule(substrateCourseEntries).map(
  (module) => module.map(
    (entry) => Object.fromEntries((entry.data.checklist ?? ['default']).map(
      (_, index) => [index, false]
    ))
  )
);

type Entry = { [k: number]: boolean };
type Module = Entry[];
export interface Progress {
  substrate: Module[];
}

const createProgress = () => {
  const [progress, setProgress] = createStore<Progress>({
    substrate: entriesByModule,
  });

  createEffect(() => {
    const startingProgress = window.localStorage.getItem('progress');
    if (startingProgress) {
      setProgress(JSON.parse(startingProgress));
    }
  });

  return { progress, setProgress };
}

export default createRoot(createProgress);
