import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TagsService } from '../services/tags.service';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tags.html',
  styleUrls: ['./tags.scss']
})
export class TagsComponent implements OnInit {

  tags: any[] = [];

  name = '';
  color = '';

  constructor(private tagsService: TagsService) {}

  ngOnInit(): void {
    this.loadTags();
  }

  loadTags() {
    this.tagsService.getTags()
      .subscribe((res: any) => {
        this.tags = res;
      });
  }

  createTag() {

    if (!this.name || !this.color) return;

    this.tagsService.createTag({
      name: this.name,
      color: this.color
    }).subscribe(() => {
      this.name = '';
      this.color = '';
      this.loadTags();
    });

  }

  deleteTag(id: string) {
    this.tagsService.deleteTag(id)
      .subscribe(() => this.loadTags());
  }
}