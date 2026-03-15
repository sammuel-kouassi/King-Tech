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
  private apiUrl = 'https://king-tech-api.onrender.com/api/commandes';

  // Méthode pour envoyer la commande
  creerCommande(commande: CommandeRequest): Observable<CommandeResponse> {
    return this.http.post<CommandeResponse>(this.apiUrl, commande);
  }

  getCommandes(): Observable<CommandeResponse[]> {
    return this.http.get<CommandeResponse[]>(this.apiUrl);
  }
}
