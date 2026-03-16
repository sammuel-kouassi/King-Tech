export interface Categorie {
  id: number;
  nom: string;
  description: string;
  icone: string;
  nombreSujets: number;
  nombreMessages: number;
}

export interface Discussion {
  id: number;
  titre: string;
  nomAuteur: string;
  initialesAuteur: string;
  dateCreation: string;
  nombreReponses: number;
  nombreVues: number;
  epingle: boolean;
  categorie?: Categorie;
  typeSujet?: string;
}

export interface MessageForum {
  id?: number;
  contenu: string;
  nomAuteur: string;
  initialesAuteur: string;
  dateCreation?: string;
}

