import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachmentsService } from '../service/attachments.service';

@Component({
  selector: 'app-attachments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attachments.html',
  styleUrls: ['./attachments.scss']
})
export class AttachmentsComponent implements OnInit {

  attachments: any[] = [];

  constructor(private service: AttachmentsService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.getAll()
      .subscribe(res => this.attachments = res);
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append('file', file);

    this.service.upload(formData)
      .subscribe(() => this.load());
  }

  delete(id: string): void {
    this.service.delete(id)
      .subscribe(() => this.load());
  }
}