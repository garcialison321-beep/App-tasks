import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  private api =
    'https://backend-tasks-api.onrender.com/api/v1/tags';

  constructor(private http: HttpClient) {}

  getTags() {
    return this.http.get<any[]>(this.api);
  }

  createTag(data: any) {
    return this.http.post(this.api, data);
  }

  deleteTag(id: string) {
    return this.http.delete(`${this.api}/${id}`);
  }

  updateTag(id: string, data: any) {
    return this.http.put(`${this.api}/${id}`, data);
  }
}