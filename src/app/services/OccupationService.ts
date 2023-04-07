import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Occupation } from '../types/occupation';

@Injectable({
  providedIn: 'root'
})

export class OccupationService {
  private apiUrl = 'https://localhost:7268/occupations';

  constructor(private http: HttpClient) { }

  getOccupations(): Observable<Occupation[]> {
    return this.http.get<Occupation[]>(this.apiUrl, { headers: { "Access-Control-Allow-Origin": "*" } });
  }
}
