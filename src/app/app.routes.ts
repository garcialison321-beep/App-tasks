import { Routes } from '@angular/router';

import { LoginComponent } from './features/auth/components/login/login';
import { DashboardComponent } from './features/layout/dashboard/dashboard';

import { TasksComponent } from './features/tasks/pages/tasks';
import { TagsComponent } from './features/tags/pages/tags';
import { NotificationsComponent } from './features/notifications/pages/notifications';
import { AttachmentsComponent } from './features/attachments/pages/attachments';
import { ActivityLogsComponent } from './features/activity-logs/pages/activity-logs';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'tasks', pathMatch: 'full' },
      { path: 'tasks', component: TasksComponent },
      { path: 'tags', component: TagsComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'attachments', component: AttachmentsComponent},
      { path: 'activity-logs', component: ActivityLogsComponent}
    ]
  }
];