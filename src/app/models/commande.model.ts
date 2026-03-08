// Ce qu'on envoie au backend (La requête)
export interface LigneCommandeRequest {
  produitId: number;
  quantite: number;
}

export interface CommandeRequest {
  nomClient: string;
  emailClient: string;
  adresseLivraison: string;
  telephone: string;
  lignes: LigneCommandeRequest[];
}

// Ce que le backend nous répond (La réponse avec le numéro généré)
export interface CommandeResponse {
  id: number;
  numeroCommande: string;
  dateCommande: string;
  total: number;
  statut: string;
  nomClient: string;
}
