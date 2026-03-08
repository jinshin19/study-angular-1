import { Component, effect, Signal, signal, WritableSignal } from '@angular/core';
import { Sample } from './../sample/sample';
import { CustomStandaloneComponent } from './../standalone/stand';
import { SwitchCaseColorsT, TodoActionT } from '../../types';
import { CommonModule } from '@angular/common';
import { CalculatorOperatorsC } from '../../constants';
import { FormsModule } from '@angular/forms';
import { TodosI } from '../../interfaces';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-learning',
  imports: [
    CommonModule,
    FormsModule,
    // Import the component ts
    Sample,
    CustomStandaloneComponent,
  ],
  templateUrl: './learning.html',
  styleUrl: './learning.css',
})
export class Learning {
  constructor() {
    effect(() => {
      const value = this.signalTypingValue();
      localStorage.setItem('angular-1-signal-typing', value);

      // Exercise | Todo list
      // --- Add todo
      const action = this.todoAction();
      if (!action) return;

      if (action === 'add' && this.todoTitle === '') return this.todoAction.set(null);

      if (action === 'add') {
        this.todos.update((p) => [
          ...p,
          { title: this.todoTitle, description: this.todoDescription },
        ]);
        this.todoTitle = '';
        this.todoDescription = '';
        this.todoAction.set(null);
      }

      // --- remove todo
      if (action === 'remove') {
        const todos = this.todos().filter((_, index) => index !== this.todoIndex);
        this.todos.set(todos);
        this.todoIndex = null;
        this.todoAction.set(null);
      }
      // ---------------
    });
  }

  public readonly useInterpolation = 'This is interpolation';
  public readonly number = 10;

  // Counter
  public counter = 0;

  // Input, get / set value
  public inputValue: string = 'typed value goes here';
  public getInputValue: string = 'Get value goes here';

  // Function click me
  public clickMe() {
    alert('You clicked me!');
  }

  public resetCounter() {
    this.counter = 0;
  }

  public increment() {
    this.counter = this.counter + 1;
  }

  public decrement() {
    if (this.counter >= 1) {
      this.counter = this.counter - 1;
    }
  }

  // Input : Typing value
  public onChange(e: Event) {
    const value = e.target as HTMLInputElement;
    this.inputValue = value.value;
  }

  // Input : Get and set value
  public setValue(value: string) {
    this.getInputValue = value;
  }

  /**
   * -------------------------------------- Calculator
   * Exercise : create a very basic calculator
   * Purpose of this exercise is to put everything learned regarding
   * interpolations, variables / properties with define types, click, input, get and set value
   */
  public calOperatorRegex = /[+\-*\/]/;
  public calValue: string = '';
  public calAnswer: number | string = 0;
  public readonly calOperators = CalculatorOperatorsC;
  public readonly calNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  public calHandleInput(value: any) {
    if (this.calOperatorRegex.test(value) && this.calValue === '') {
      return;
    }
    if (
      this.calValue !== '' &&
      this.calOperatorRegex.test(this.calValue) &&
      this.calOperators.includes(value)
    ) {
      return;
    }
    this.calValue += value;
  }

  public calClear() {
    this.calValue = this.calValue.slice(0, -1);
    this.calAnswer = '';
  }

  public calClearAll() {
    this.calValue = '';
    this.calAnswer = 0;
  }

  public calCalculate() {
    const splitNumbers = this.calValue.split(this.calOperatorRegex);
    const matchResult = this.calValue.match(this.calOperatorRegex);
    if (!matchResult) return;
    const operator = matchResult[0] as string;
    const num1 = parseInt(splitNumbers[0]);
    const num2 = parseInt(splitNumbers[1]);

    switch (operator) {
      case '+':
        return (this.calAnswer = num1 + num2);
      case '-':
        return (this.calAnswer = num1 - num2);
      case '*':
        return (this.calAnswer = num1 * num2);
      case '/':
        return (this.calAnswer = num1 / num2);
      default:
        return operator;
    }
  }

  /**
   * ---------------------------------------
   */

  /**
   * Conditions
   */
  // If else
  public isLoading: boolean = false;

  public toggleLoading() {
    this.isLoading = !this.isLoading;
  }

  // If else
  public color: SwitchCaseColorsT = 'red';

  public onSelect(value: string) {
    this.color = value as SwitchCaseColorsT;
  }
  /**
   * ---------------------------------------
   */

  /**
   * Loops
   */
  // If else
  public persons = [
    { id: 1, name: 'Person 1', age: 23 },
    { id: 2, name: 'Person 2', age: 20 },
    { id: 3, name: 'Person 3', age: 25 },
  ];

  /**
   * ---------------------------------------
   */

  /**
   * The basics of signal
   * Signal defining basic types e.g WritableSignal<Type here> or to signal directly signal<Type here>("")
   * use Set to update signal's value;
   * Signal and effect used to do something e.g call api, change something etc
   * effect is a reactive. It caches any signal changes used inside effect
   */

  private signalDefaultValue = 'signal value';

  public signalValue = signal<string>(this.signalDefaultValue);
  public signalTypingValue: WritableSignal<string> = signal(this.signalDefaultValue);

  public handleInputSignalValue(value: string) {
    if (value === '') return this.signalValue.set(this.signalDefaultValue);
    return value;
  }

  public updateSignalValue(value: string) {
    this.signalValue.set(value);
  }

  public handleTypingSignalValue(value: string) {
    // Add the value to localStorage, do it using effect instead here.
    return this.signalTypingValue.set(value);
  }

  // Computed signals the readonly
  // computed() = effect signal()

  // Two way binding
  public bindName = 'josh';

  // Exercise | Create todo list
  public todoAction = signal<TodoActionT | null>(null);
  public todos = signal<TodosI[]>([]);
  public todoTitle = '';
  public todoDescription = '';
  public todoIndex: number | null = null;
  public todoColor = '#212020';

  public addTodo() {
    this.todoAction.set('add');

    // this.todos.update((prev) => [...prev, { ...newTodo }]); I can use this but for the sake of the exercise I will use the effect instead lol
  }

  public removeTodo(index: number) {
    /**
     * Normally I could just add id to todos interface
     * But for the sake of the exercise I'll be over engineering things
     */
    this.todoAction.set('remove');
    this.todoIndex = index;
  }

  public keyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.todoTitle !== '') {
      this.addTodo();
    }
  }
}
