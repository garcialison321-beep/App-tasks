import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityLogsService } from '../service/activity-logs.service';

@Component({
  selector: 'app-activity-logs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity-logs.html',
  styleUrls: ['./activity-logs.scss']
})
export class ActivityLogsComponent implements OnInit {

  logs: any[] = [];

  constructor(private service: ActivityLogsService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.getAll()
      .subscribe(res => this.logs = res);
  }
}