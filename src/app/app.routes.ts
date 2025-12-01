import { Routes } from '@angular/router';
import { Home } from './screens/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home',
  },
  {
    path: 'counter',
    loadComponent: () => import('./screens/counter/counter').then((m) => m.Counter),
    title: 'Contador',
  },
  {
    path: 'tasks',
    loadComponent: () => import('./screens/tasks/tasks').then((m) => m.Tasks),
    title: 'Tarefas',
  },
];
