import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  private http = inject(HttpClient);
  private apiUrl = 'https://king-tech-api.onrender.com/api/formation';

  getCours(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cours`);
  }
}
