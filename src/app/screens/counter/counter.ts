import { Component, effect, signal } from '@angular/core';
import { Title } from '../../components/shared/title/title';

@Component({
  selector: 'app-counter',
  imports: [Title],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
})
export class Counter {
  count = signal(0);

  constructor() {
    const stored = localStorage.getItem('counter');
    if (stored !== null) {
      const value = Number(stored);
      if (!Number.isNaN(value)) {
        this.count.set(value);
      }
    }

    effect(() => {
      const value = this.count();
      localStorage.setItem('counter', value.toString());
    });
  }

  increment() {
    this.count.update((value) => value + 1);
  }

  decrement() {
    this.count.update((value) => value - 1);
  }

  reset() {
    this.count.set(0);
  }
}
