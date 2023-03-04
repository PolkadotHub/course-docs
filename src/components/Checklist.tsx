import { Component, For } from 'solid-js';
import courseProgress from './progress';

export interface ChecklistProps {
  module: number;
  entryNumber: number;
  items: string[];
}

export const Checklist: Component<ChecklistProps> = (props) => {
  const { progress, setProgress } = courseProgress;

  const handleChange = () => {
    setProgress('substrate', props.module, props.entryNumber, 'done', (done) => !done);
    window.localStorage.setItem('progress', JSON.stringify(progress));
  };
  
  return (
    <div class="flex items-center bg-green-light dark:bg-green-dark p-5 border border-black dark:border-white rounded my-5">
      <For each={props.items}>
        {(item) => (
          <label class="flex items-center text-black dark:text-white">
            <input
              type="checkbox"
              class="rounded border border-black dark:border-white h-6 w-6 mr-4 accent-green"
              onChange={handleChange}
              checked={progress.substrate[props.module][props.entryNumber].done}
            />
            {item}
          </label>
        )}
      </For>
    </div>
  );
}
