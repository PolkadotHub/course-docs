import { Component, For } from 'solid-js';
import courseProgress, { Progress } from './progress';

export interface ChecklistProps {
  module: number;
  entryNumber: number;
  items: string[];
}

export const Checklist: Component<ChecklistProps> = (props) => {
  const { progress, setProgress } = courseProgress;

  const handleChange = (checkboxIndex: number) => {
    setProgress('substrate', 'checklist', props.module, props.entryNumber, checkboxIndex, (done) => !done);
    window.localStorage.setItem('progress', JSON.stringify(progress));
  };
  
  return (
    <div class="flex flex-col justify-center bg-green-light dark:bg-green-dark p-5 border border-black dark:border-white rounded my-5">
      <h1 class="text-2xl mb-4">Checklist</h1>
      <ul class="list-none p-0">
        {props.items ? (
          <For each={props.items}>
            {(item, index) => (
              <ChecklistItem
                module={props.module}
                entryNumber={props.entryNumber}
                index={index()}
                onChange={handleChange}
                text={item}
                progress={progress}
              />
            )}
          </For>
        ) : (
          <ChecklistItem
            module={props.module}
            entryNumber={props.entryNumber}
            index={0}
            onChange={handleChange}
            text="Pronto para avanzar"
            progress={progress}
          />
        )}
      </ul>
    </div>
  );
}

interface ChecklistItemProps {
  module: number;
  entryNumber: number;
  index: number;
  onChange: (checkboxIndex: number) => void;
  text: string;
  progress: Progress;
}

const ChecklistItem: Component<ChecklistItemProps> = (props) => (
  <li>
    <label class="flex items-center text-black dark:text-white">
      <input
        type="checkbox"
        class="rounded border border-black dark:border-white h-6 w-6 mr-4 accent-green"
        onChange={() => props.onChange(props.index)}
        checked={props.progress.substrate.checklist[props.module][props.entryNumber][props.index]}
      />
      {props.text}
    </label>
  </li>
);
