import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/auth';

  // Le BehaviorSubject permet de savoir "en direct" dans toute l'appli si on est connecté
  private currentUserSubject = new BehaviorSubject<any>(
    JSON.parse(localStorage.getItem('currentUser') || 'null')
  );
  public currentUser$ = this.currentUserSubject.asObservable();

  // Obtenir l'utilisateur actuel (utile pour les futurs posts du forum)
  get currentUserValue() {
    return this.currentUserSubject.value;
  }

  // --- API ---
  login(email: string, motDePasse: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, motDePasse })
      .pipe(tap(user => this.sauvegarderSession(user)));
  }

  register(utilisateur: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, utilisateur)
      .pipe(tap(user => this.sauvegarderSession(user)));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  private sauvegarderSession(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  loginWithGoogle(token: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/google`, { token: token }).pipe(
      tap((user) => {
        // On sauvegarde l'utilisateur comme pour une connexion normale
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }
}
