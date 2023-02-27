import { CollectionEntry } from 'astro:content';
import clsx from 'clsx';
import { Component, createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';

type CourseEntriesByModule = CollectionEntry<'substrate'>[][];

export interface CourseTrackerProps {
  courseEntriesByModule: CourseEntriesByModule;
  module: number;
}

export const CourseTracker: Component<CourseTrackerProps> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [activeTab, setActiveTab] = createSignal(props.module);
  // const startingProgress = typeof window !== undefined ? JSON.parse(window.localStorage.getItem('progress')) : [];
  // const [progress, setProgress] = createStore(startingProgress);

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
        'absolute border border-black bg-green top-full left-0 mt-4 w-full rounded-lg',
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
                <Checkmark checked /> {index}. {entry.data.title}
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

const Checkmark: Component<CheckmarkProps> = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" classList={{ 'w-5 h-5 inline mr-1': true, 'bg-black clip-circle-40': !props.checked }}>
  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
</svg>;
