import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.scss']
})
export class TasksComponent implements OnInit {

  tasks: any[] = [];

  title = '';
  description = '';

  constructor(
    private taskService: TasksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {

    this.taskService.getTasks()
      .subscribe({
        next: (response: any) => {
          this.tasks = response;
        },
        error: (error) => {
          console.error('Error cargando tareas:', error);
        }
      });

  }

  addTask(): void {

    if (!this.title.trim() || !this.description.trim()) {
      alert('Completa todos los campos');
      return;
    }

    const body = {
      title: this.title,
      description: this.description,
      projectId: '',
      priority: 'medium',
      status: 'pending'
    };

    this.taskService.createTask(body)
      .subscribe({
        next: () => {

          this.title = '';
          this.description = '';

          this.loadTasks();

          alert('Tarea creada correctamente ✅');
        },
        error: (error) => {
          console.error(error);
          alert('No fue posible crear la tarea');
        }
      });

  }

  deleteTask(id: string): void {

    this.taskService.deleteTask(id)
      .subscribe({
        next: () => {
          this.loadTasks();
        },
        error: (error) => {
          console.error(error);
        }
      });

  }

  toggleTask(task: any): void {

    const newStatus =
      task.status === 'completed'
        ? 'pending'
        : 'completed';

    const body = {
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: newStatus
    };

    this.taskService.updateTask(task._id, body)
      .subscribe({
        next: () => {
          this.loadTasks();
        },
        error: (error) => {
          console.error(error);
        }
      });

  }

  logout(): void {

    localStorage.removeItem('token');

    this.router.navigate(['/login']);

  }

  get completedTasks(): number {

    return this.tasks.filter(
      task => task.status === 'completed'
    ).length;

  }

  get pendingTasks(): number {

    return this.tasks.filter(
      task => task.status !== 'completed'
    ).length;

  }

}