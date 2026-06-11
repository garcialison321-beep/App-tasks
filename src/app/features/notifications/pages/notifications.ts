import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsService } from '../service/notifications.service';
import { Notification } from '../models/notifications';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.html',
  styleUrls: ['./notifications.scss']
})
export class NotificationsComponent implements OnInit {

  notifications: Notification[] = [];

  constructor(private service: NotificationsService) {}

  ngOnInit(): void {
    console.log('📢 Notifications component cargado');
    this.load();
  }

 load(): void {
  this.service.getAll()
    .subscribe({
      next: (res: Notification[]) => {
        console.log('📦 NOTIFICATIONS RESPONSE:', res);
        this.notifications = res;
      },
      error: (err) => {
        console.error('❌ ERROR NOTIFICATIONS:', err);
      }
    });
}

  markRead(id: string): void {
    this.service.markAsRead(id)
      .subscribe({
        next: () => this.load(),
        error: (err) => console.error(err)
      });
  }

  delete(id: string): void {
    this.service.delete(id)
      .subscribe({
        next: () => this.load(),
        error: (err) => console.error(err)
      });
  }
}