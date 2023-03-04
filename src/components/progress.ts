import { createEffect, createRoot } from "solid-js";
import { createStore } from "solid-js/store";
import { getCollection } from 'astro:content';
import { groupEntriesByModule } from "../helpers";

const substrateCourseEntries = await getCollection('substrate');
const entriesByModule = groupEntriesByModule(substrateCourseEntries).map(
  (module) => module.map(
    (entry) => entry.data.checklist.flatMap(
      (_, index) => ({ [index]: false })
    )
  )
);

const createProgress = () => {
  const [progress, setProgress] = createStore({
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
