import type { CollectionEntry } from 'astro:content';
import clsx from 'clsx';
import { Component, createSignal } from 'solid-js';
import courseProgress from './progress';

type CourseEntriesByModule = CollectionEntry<'substrate'>[][];

export interface CourseTrackerProps {
  courseEntriesByModule: CourseEntriesByModule;
  module: number;
}

export const CourseTracker: Component<CourseTrackerProps> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [activeTab, setActiveTab] = createSignal(props.module);
  const { progress } = courseProgress;

  const toggleOpen = () => {
    setIsOpen(!isOpen());
  }

  return (
    <div class="relative">
      <button onClick={toggleOpen} class="flex items-center px-3 py-1 bg-green rounded sm:hidden">
        <span class="text-white">Progreso</span>
        <ChevronRight rotate={isOpen()} />
      </button>
      <div class={clsx(
        'absolute border border-black bg-green top-full left-0 mt-4 w-full rounded',
        'dark:border-white sm:m-0 sm:w-72 sm:block',
        isOpen() ? 'block' : 'hidden'
      )}>
        <ul class="list-none flex p-0">
          {props.courseEntriesByModule.map((_, index) => (
            <li class="group">
              <button
                classList={{
                  'w-5 h-full px-5 py-2 flex justify-center items-center group-first:rounded-tl': true,
                  'dark:bg-green-dark bg-green-light': activeTab() === index
                }}
                onClick={() => setActiveTab(index)}>
                {index}
              </button>
            </li>
          ))}
        </ul>
        <ul class="list-none dark:bg-green-dark bg-green-light p-2 rounded-b">
          {props.courseEntriesByModule[activeTab()].map((entry, index) => (
            <li>
              <a href={`/${entry.collection}/${entry.slug}`} class="inline-block w-full hover:underline flex items-center">
                <Checkmark checked={progress[entry.collection][activeTab()][index].done} /> {index}. {entry.data.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

interface ChevronProps {
  rotate: boolean;
}

const ChevronRight: Component<ChevronProps> = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" classList={{ 'w-6 h-6 inline text-green-dark transition-transform': true, 'rotate-90': props.rotate }}>
  <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clip-rule="evenodd" />
</svg>;

interface CheckmarkProps {
  checked: boolean;
}

const Checkmark: Component<CheckmarkProps> = (props) => (
  <div
    classList={{
      'h-5 w-5 mr-2 rounded-full flex items-center justify-center border border-black dark:border-white': true,
      'bg-green': props.checked,
      'bg-white dark:bg-black': !props.checked
    }}>
    {props.checked && <div class="w-3 h-1.5 border-l border-b border-black dark:border-white -rotate-45 -translate-y-1/4" />}
  </div>
);
