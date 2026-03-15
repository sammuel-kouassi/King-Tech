export interface LigneCommandeRequest {
  produitId: number;
  quantite: number;
}

export interface LigneCommandeResponse {
  id: number;
  produit: {
    id: number;
    nom: string;
    prix: number;
  };
  quantite: number;
  prixUnitaire: number;
  sousTotal: number;
}

export interface CommandeRequest {
  nomClient: string;
  emailClient: string;
  adresseLivraison: string;
  telephone: string;
  lignes: LigneCommandeRequest[];
}

export interface CommandeResponse {
  id: number;
  numeroCommande: string;
  dateCommande: string;
  total: number;
  statut: string;
  nomClient: string;
  emailClient: string;
  adresseLivraison: string;
  telephone: string;
  lignes: LigneCommandeResponse[];
}

