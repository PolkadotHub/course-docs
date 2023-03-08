import { Component, For } from 'solid-js';
import courseProgress from './progress';

interface Question {
  text: string;
  options: string[];
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
            <li class="space-y-2">
              <p>{question.text}</p>
              <ul class="list-none p-0 space-y-2">
                <For each={question.options}>
                  {(option, index) => (
                    <li>
                      <label>
                        <input
                          type="radio"
                          class="rounded border border-black dark:border-white h-6 w-6 mr-4 accent-green"
                          checked={progress.substrate.quiz[props.module][props.entryNumber][questionIndex()] === index()}
                          onChange={() => handleChange(questionIndex(), index())}
                        />
                        {option}
                      </label>
                    </li>
                  )}
                </For>
              </ul>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}
