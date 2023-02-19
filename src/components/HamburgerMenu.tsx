import { createSignal, For, Component } from 'solid-js';
import clsx from 'clsx';

import { DarkModeButton } from './DarkModeButton.jsx';
import { navItems } from '../data/navItems';

export const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = createSignal(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen());
  }

  return (
    <>
      <a href="/substrate" class="h-full inline-block sm:hidden">
        <img src="/assets/polkadot-hub-logo.png" alt="Polkadot Hub" class="h-full p-2" />
      </a>
      <button onClick={toggleOpen} class="px-3 sm:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
          <path fill-rule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
        </svg>
      </button>
        <div class={clsx(isOpen() ? 'block' : 'hidden')}>
          <div class="absolute bg-white dark:bg-black inset-0 z-10" />
          <button class="text-white absolute right-3 top-5 z-20" onClick={toggleOpen}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
            </svg>
          </button>
          <ul class="absolute flex-col items-start px-5 space-y-5 inset-0 top-16 z-20">
            <For each={navItems}>
              {(navItem) => <HamburgerMenuItem link={navItem.href} text={navItem.text} />}
            </For>
            <li class="p-3">
              <DarkModeButton />
            </li>
          </ul>
        </div>
    </>
  );
}

interface HamburgerMenuItemProps {
  link: string;
  text: string;
}

const HamburgerMenuItem: Component<HamburgerMenuItemProps> = (props) => (
  <li class="w-full hover:bg-green">
    <a class="w-full inline-block p-3" href={props.link}>{props.text}</a>
  </li>
);
