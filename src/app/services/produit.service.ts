import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ProduitDetail, ProduitResume} from '../models/produit.model';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private http = inject(HttpClient);

  private apiUrl = 'https://king-tech-api.onrender.com/api/produits';

  getProduits(): Observable<ProduitResume[]> {
    return this.http.get<ProduitResume[]>(this.apiUrl);
  }

  // Récupère un seul produit avec tous ses détails
  getProduitById(id: number): Observable<ProduitDetail> {
    return this.http.get<ProduitDetail>(`${this.apiUrl}/${id}`);
  }
}
