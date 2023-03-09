import { Component, createSignal } from 'solid-js';
import { Portal } from 'solid-js/web';

import { Button } from './Button';

export const RegisterFormButton: Component = () => {
  const [showingModal, setShowingModal] = createSignal();
  
  return (
    <>
      <Button onClick={() => setShowingModal(true)}>Reservar mi cupo</Button>
      <Portal>
        <RegisterFormModal
          open={showingModal()}
          onClose={() => setShowingModal(false)}
        />
      </Portal>
    </>
  );
}

interface RegisterFormModalProps {
  open: boolean;
  onClose: () => void;
}

const RegisterFormModal: Component<RegisterFormModalProps> = (props) => {
  return (
    <div classList={{
      'absolute': props.open,
      'hidden': !props.open,
      'inset-0 z-10 bg-white rounded border border-black': true,
      'dark:bg-green-dark dark:border-white': true,
    }}>
      <button onClick={onClose} class="absolute top-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
          <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
        </svg>
      </button>
      <h1>Registro</h1>
    </div>
  );
}
