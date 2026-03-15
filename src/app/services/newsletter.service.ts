import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  private http = inject(HttpClient);
  private apiUrl = 'https://king-tech-api.onrender.com/api/newsletter/subscribe';

  subscribe(email: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email: email });
  }
}
