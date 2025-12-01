import { Component, inject } from '@angular/core';
import { Title } from '../../components/shared/title/title';
import { TodosService } from '../../services/todos.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tasks',
  imports: [Title, MatIconModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  private readonly todosService = inject(TodosService);
  readonly todos = this.todosService.items;

  toggleTodo(id: string) {
    this.todosService.toggleTodo(id);
  }

  removeTodo(id: string) {
    this.todosService.removeTodo(id);
  }

  addTodo(event: Event) {
    event.preventDefault();

    const inputElement = event.target as HTMLInputElement;

    const title = inputElement.value.trim();
    if (!title) {
      return;
    }

    this.todosService.addTodo(title);
    inputElement.value = '';
  }
}
