import { Component, For } from 'solid-js';
import { Track } from '../data/tracks';
import courseProgress, { Progress } from './progress';

export interface ChecklistProps {
  module: number;
  entryNumber: number;
  items: string[];
  track: Track;
}

export const Checklist: Component<ChecklistProps> = (props) => {
  const { progress, setProgress } = courseProgress;

  const handleChange = (checkboxIndex: number) => {
    setProgress(props.track, 'checklist', props.module, props.entryNumber, checkboxIndex, (done) => !done);
    window.localStorage.setItem('progress', JSON.stringify(progress));
  };

  return (
    <div classList={{
      "flex flex-col justify-center p-5 border border-black dark:border-white rounded my-5": true,
      "bg-green-light dark:bg-green-dark": props.track === Track.Substrate,
      "bg-orange-light dark:bg-orange-dark": props.track === Track.Rust
    }}>
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
                track={props.track}
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
            track={props.track}
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
  track: Track;
}

const ChecklistItem: Component<ChecklistItemProps> = (props) => (
  <li>
    <label class="flex items-center text-black dark:text-white">
      <input
        type="checkbox"
        classList={{
          "rounded border border-black dark:border-white h-6 w-6 mr-4": true,
          "accent-green": props.track === Track.Substrate,
          "accent-orange": props.track === Track.Rust
        }}
        onChange={() => props.onChange(props.index)}
        checked={props.progress[props.track].checklist[props.module][props.entryNumber][props.index]}
      />
      {props.text}
    </label>
  </li>
);
