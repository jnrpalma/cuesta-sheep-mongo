import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { Animal } from '../../components/register-animal/interface/animal.interface';


@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private apiUrl = 'http://localhost:5000/api/animals';

  addAnimal(animal: Animal): Observable<Animal> {
    return from(axios.post<Animal>(this.apiUrl, animal).then(response => response.data));
  }

  getAnimals(): Observable<Animal[]> {
    return from(axios.get<Animal[]>(this.apiUrl).then(response => response.data));
  }
}
