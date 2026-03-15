import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpertService {
  private http = inject(HttpClient);
  private apiUrl = 'https://king-tech-api.onrender.com/api/experts';

  //Récupérer la liste des experts
  getExperts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  //Charger l'historique des messages entre toi et un expert
  getConversation(userId: number, expertId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/chat?userId=${userId}&expertId=${expertId}`);
  }

  //Envoyer un message privé
  envoyerMessage(expediteurId: number, destinataireId: number, contenu: string): Observable<any> {
    const payload = { contenu: contenu };
    return this.http.post<any>(
      `${this.apiUrl}/chat?expediteurId=${expediteurId}&destinataireId=${destinataireId}`,
      payload
    );
  }

  //Récupérer les clients qui ont contacté l'expert
  getClientsPourExpert(expertId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${expertId}/clients`);
  }
}
