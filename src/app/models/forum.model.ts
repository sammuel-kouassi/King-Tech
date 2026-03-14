export interface Categorie {
  id: number;
  nom: string;
  icone: string; // Ex: 'assets/images/arduino-icon.png' ou une classe CSS
  nombreSujets: number;
  nombreMessages: number;
}

export interface Discussion {
  id: number;
  titre: string;
  nomAuteur: string;
  initialesAuteur: string; // Ex: 'MS' pour MakerSophie
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

