import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorie, Discussion } from '../models/forum.model';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/forum';

  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.apiUrl}/categories`);
  }

  getDernieresDiscussions(): Observable<Discussion[]> {
    return this.http.get<Discussion[]>(`${this.apiUrl}/discussions`);
  }
  // NOUVEAU : Récupérer les discussions d'une catégorie spécifique
  getDiscussionsParCategorie(categorieId: number): Observable<Discussion[]> {
    return this.http.get<Discussion[]>(`${this.apiUrl}/categories/${categorieId}/discussions`);
  }

  creerDiscussion(nouvelleDiscussion: any, categorieId: number): Observable<Discussion> {
    return this.http.post<Discussion>(`${this.apiUrl}/categories/${categorieId}/discussions`, nouvelleDiscussion);
  }

  getDiscussion(id: number): Observable<Discussion> {
    return this.http.get<Discussion>(`${this.apiUrl}/discussions/${id}`);
  }

  getMessages(discussionId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/discussions/${discussionId}/messages`);
  }

  ajouterMessage(discussionId: number, message: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/discussions/${discussionId}/messages`, message);
  }

  // Récupérer les statistiques globales du forum
  getStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stats`);
  }

}
