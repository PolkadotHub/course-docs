import { Accessor, Component, createEffect, createSignal, For, Show } from 'solid-js';
import courseProgress, { Progress } from './progress';
import { Button } from './Button';

interface Question {
  text: string;
  options: string[];
  correctOption: number;
}

export interface QuizProps {
  module: number;
  entryNumber: number;
  questions: Question[];
}

export const Quiz: Component<QuizProps> = (props) => {
  const { progress, setProgress } = courseProgress;

  const handleChange = (questionIndex: number, selectedOptionIndex: number) => {
    setProgress('substrate', 'quiz', props.module, props.entryNumber, questionIndex, selectedOptionIndex);
    window.localStorage.setItem('progress', JSON.stringify(progress));
  };
  
  return (
    <div class="flex flex-col justify-center bg-green-light dark:bg-green-dark p-5 border border-black dark:border-white rounded my-5">
      <h1 class="text-2xl mb-4">Pone a prueba tu conocimiento</h1>
      <ul class="list-none p-0 space-y-4">
        <For each={props.questions}>
          {(question, questionIndex) => (
            <QuestionComponent
              question={question}
              questionIndex={questionIndex()}
              onChange={handleChange}
              progress={progress}
              module={props.module}
              entryNumber={props.entryNumber}
            />
          )}
        </For>
      </ul>
    </div>
  );
}

interface QuestionComponentProps {
  question: Question;
  questionIndex: number;
  onChange: (questionIndex: number, index: number) => void;
  progress: Progress;
  module: number;
  entryNumber: number;
}

const QuestionComponent: Component<QuestionComponentProps> = (props) => {
  const [isCorrectAnswer, setIsCorrectAnswer] = createSignal(false);
  const [showCheckOrCross, setShowCheckOrCross] = createSignal(false);
  
  const checkAnswer = () => {
    const isCorrect = (
      props.progress.substrate.quiz[props.module][props.entryNumber][props.questionIndex] ===
        props.question.correctOption
    );
    setIsCorrectAnswer(isCorrect);
    setShowCheckOrCross(true);
    setTimeout(() => {
      setShowCheckOrCross(false);
    }, 500);
  }

  return (
    <li class="space-y-2">
      <p>{props.question.text}</p>
      <ul class="list-none pb-4 px-0 space-y-2">
        <For each={props.question.options}>
          {(option, index) => (
            <li>
              <label>
                <input
                  type="radio"
                  class="rounded border border-black dark:border-white h-6 w-6 mr-4 accent-green"
                  checked={props.progress.substrate.quiz[props.module][props.entryNumber][props.questionIndex] === index()}
                  onChange={() => props.onChange(props.questionIndex, index())}
                />
                {option}
              </label>
            </li>
          )}
        </For>
      </ul>
      <div class="mr-3 inline">
        <Button onClick={checkAnswer}>Verificar</Button>
      </div>
      <Show when={showCheckOrCross()}>
        <CheckOrCross checked={isCorrectAnswer()} />
      </Show>
    </li>
  );  
}

interface CheckOrCrossProps {
  checked: boolean;
}

const CheckOrCross: Component<CheckOrCrossProps> = (props) => {
  return props.checked ? (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 inline text-green">
      <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 inline text-red-500">
      <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
    </svg>
  );
}
