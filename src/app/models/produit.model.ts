export interface ProduitResume {
  id: number;
  nom: string;
  prix: number;
  categorie: string;
  note: number;
  badge: string;
  imagePrincipale: string;
  isPopular: boolean;
}

export interface ProduitDetail {
  id: number;
  nom: string;
  descriptionCourte: string;
  description: string;
  prix: number;
  categorie: string;
  stock: number;
  note: number;
  badge: string;
  images: string[]; // Le tableau des 3 images
  caracteristiques: { [key: string]: string }; // L'équivalent TypeScript du JSONB de PostgreSQL
}
