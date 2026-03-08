import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommandeRequest, CommandeResponse } from '../models/commande.model';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private http = inject(HttpClient);

  // L'URL de ton nouveau Controller Spring Boot
  private apiUrl = 'http://localhost:8080/api/commandes';

  // Méthode pour envoyer la commande
  creerCommande(commande: CommandeRequest): Observable<CommandeResponse> {
    return this.http.post<CommandeResponse>(this.apiUrl, commande);
  }

  // À ajouter sous ta méthode creerCommande() existante
  getCommandes(): Observable<CommandeResponse[]> {
    return this.http.get<CommandeResponse[]>(this.apiUrl);
  }
}
