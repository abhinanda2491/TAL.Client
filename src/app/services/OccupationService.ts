import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Occupation } from '../types/occupation';

const header = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})

export class OccupationService {
  private apiUrl = 'https://localhost:7268/';

  constructor(private http: HttpClient) { }

  getOccupations(): Observable<Occupation[]> {
    return this.http.get<Occupation[]>(this.apiUrl + "home/occupations", header);
  }

  calculatePremium(requestBody: string) {
    return this.http.post(this.apiUrl + "home/caluclatePremium", requestBody, header);
  }
}
