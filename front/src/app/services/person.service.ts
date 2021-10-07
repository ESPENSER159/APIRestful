import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Person } from '../models/person';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getPersons() {
    return this.http.get(`${this.API_URI}/persons`);
  }

  getOnePerson(id: string) {
    return this.http.get(`${this.API_URI}/persons/${id}`);
  }

  deletePerson(id: string) {
    return this.http.delete(`${this.API_URI}/persons/${id}`);
  }

  savePerson(person: Person) {
    return this.http.post(`${this.API_URI}/persons`, person);
  }

  updatePerson(id: string, updatedPerson: Person) {
    return this.http.put(`${this.API_URI}/persons/${id}`, updatedPerson);
  }

}
