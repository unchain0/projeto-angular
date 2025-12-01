import { effect, Injectable, signal } from '@angular/core';
import { Todo } from '../model/todo.entity';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private readonly _items = signal<Array<Todo>>([
    { id: crypto.randomUUID(), title: 'Implementar App Mobile', completed: false },
    { id: crypto.randomUUID(), title: 'Implementar API', completed: false },
    { id: crypto.randomUUID(), title: 'Implementar Database', completed: true },
  ]);

  readonly items = this._items.asReadonly();

  constructor() {
    this._loadFromStorage();

    effect(() => {
      const items = this._items();
      localStorage.setItem('todos', JSON.stringify(items));
    });
  }

  /**
   * Alterna o status de completado de um todo
   * @param id ID do todo a ser alternado
   */
  toggleTodo(id: string) {
    this._items.update((items) =>
      items.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  }

  /**
   * Adiciona um novo todo
   * @param title Título do todo
   */
  addTodo(title: string) {
    this._items.update((items) => [...items, { id: crypto.randomUUID(), title, completed: false }]);
  }

  /**
   * Remove um todo pelo ID
   * @param id ID do todo a ser removido
   */
  removeTodo(id: string) {
    this._items.update((items) => items.filter((item) => item.id !== id));
  }

  /**
   * Atualiza o título de um todo
   * @param id ID do todo a ser atualizado
   * @param title Novo título do todo
   */
  updateTodo(id: string, title: string) {
    this._items.update((items) =>
      items.map((item) => (item.id === id ? { ...item, title } : item))
    );
  }

  private _loadFromStorage() {
    const stored = localStorage.getItem('todos');
    if (stored) {
      const items = JSON.parse(stored) as Array<Todo>;
      this._items.set(items);
    }
  }
}
