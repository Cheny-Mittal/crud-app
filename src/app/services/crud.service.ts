import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})

export class CrudService{

  baseUrl = 'https://my-json-server.typicode.com/voramahavir/contacts-mock-response';
  constructor(private http: HttpClient) { }

  getStudents() {
    return this.http.get<Student[]>(`${this.baseUrl}/contacts`);           
  }
}

