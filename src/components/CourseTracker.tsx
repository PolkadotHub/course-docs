import clsx from "clsx";
import { Component, createSignal } from "solid-js";
import type { CourseEntriesByModule } from "../data/courseEntries";
import { Track } from "../data/tracks";
import courseProgress from "./progress";

export interface CourseTrackerProps {
  courseEntriesByModule: CourseEntriesByModule;
  track: Track;
  module: number;
}

export const CourseTracker: Component<CourseTrackerProps> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [activeTab, setActiveTab] = createSignal(props.module);
  const { progress } = courseProgress;

  const toggleOpen = () => {
    setIsOpen(!isOpen());
  };

  return (
    <div class="relative">
      <button
        onClick={toggleOpen}
        class={clsx(
          "flex items-center px-3 py-1  rounded lg:hidden",
          props.track === Track.Substrate && "bg-green",
          props.track === Track.Rust && "bg-orange"
        )}
      >
        <span class="text-white">Progreso</span>
        <ChevronRight rotate={isOpen()} track={props.track} />
      </button>
      <div
        class={clsx(
          "absolute border border-black top-full left-0 mt-4 w-full rounded",
          "dark:border-white lg:m-0 lg:w-72 lg:block",
          isOpen() ? "block" : "hidden",
          props.track === Track.Substrate && "bg-green",
          props.track === Track.Rust && "bg-orange"
        )}
      >
        <ul class="list-none flex p-0">
          {props.courseEntriesByModule.map((_, index) => (
            <li class="group">
              <button
                classList={{
                  "w-5 h-full px-5 py-2 flex justify-center items-center group-first:rounded-tl":
                    true,
                  "dark:bg-green-dark bg-green-light":
                    activeTab() === index && props.track === Track.Substrate,
                  "dark:bg-orange-dark bg-orange-light":
                    activeTab() === index && props.track === Track.Rust,
                }}
                onClick={() => setActiveTab(index)}
              >
                {index}
              </button>
            </li>
          ))}
        </ul>
        <ul
          class={clsx(
            "list-none  p-2 rounded-b",
            props.track === Track.Substrate &&
              "dark:bg-green-dark bg-green-light",
            props.track === Track.Rust && "dark:bg-orange-dark bg-orange-light"
          )}
        >
          {props.courseEntriesByModule[activeTab()].map((entry, index) => {
            const checklist =
              progress[entry.collection].checklist[activeTab()][index];
            const isChecked = Object.values(checklist).every((check) => check);

            return (
              <li>
                <a
                  href={`/${entry.collection}/${entry.slug}`}
                  class="inline-block w-full hover:underline flex items-center"
                >
                  <Checkmark checked={isChecked} track={props.track} /> {index}.{" "}
                  {entry.data.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

interface ChevronProps {
  rotate: boolean;
  track: Track;
}

const ChevronRight: Component<ChevronProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    classList={{
      "w-6 h-6 inline transition-transform": true,
      "rotate-90": props.rotate,
      "text-green-dark": props.track === Track.Substrate,
      "text-orange-dark": props.track === Track.Rust,
    }}
  >
    <path
      fill-rule="evenodd"
      d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
      clip-rule="evenodd"
    />
  </svg>
);

interface CheckmarkProps {
  checked: boolean;
  track: Track;
}

const Checkmark: Component<CheckmarkProps> = (props) => (
  <div
    classList={{
      "h-5 w-5 mr-2 rounded-full flex items-center justify-center border border-black dark:border-white":
        true,
      "bg-green": props.checked && props.track === Track.Substrate,
      "bg-orange": props.checked && props.track === Track.Rust,
      "bg-white dark:bg-black": !props.checked,
    }}
  >
    {props.checked && (
      <div class="w-3 h-1.5 border-l border-b border-black dark:border-white -rotate-45 -translate-y-1/4" />
    )}
  </div>
);
