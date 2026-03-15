import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router'; // <-- Router est bien importé ici !
import { FormsModule } from '@angular/forms';
import { ForumService } from '../services/forum.service';
import { AuthService } from '../services/auth.service';
import { Discussion } from '../models/forum.model';

@Component({
  selector: 'app-categorie-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './categorie-detail.component.html',
  styleUrls: ['./categorie-detail.component.css']
})
export class CategorieDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private forumService = inject(ForumService);
  private cdr = inject(ChangeDetectorRef);
  private location = inject(Location);
  private router = inject(Router);
  private authService = inject(AuthService);

  categorieId!: number;
  categorieNom: string = 'Chargement...';
  discussions: Discussion[] = [];

  isModalOpen = false;
  showLoginPrompt = false;

  sujetsPredefinis = [
    'Entraide & Bugs',
    'Partage de Projet',
    'Question Matériel',
    'Tutoriel',
    'Discussion Générale'
  ];

  nouvelleDiscussion = {
    titre: '',
    typeSujet: this.sujetsPredefinis[0],
    nomAuteur: 'Jean Kouassi',
    initialesAuteur: 'JK',

    epingle: false,
    nombreReponses: 0,
    nombreVues: 0
  };

  ngOnInit() {
    this.categorieId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.categorieId) {
      this.chargerDiscussions();
    }
  }

  chargerDiscussions() {
    this.forumService.getDiscussionsParCategorie(this.categorieId).subscribe({
      next: (data) => {
        this.discussions = data;
        if (this.discussions.length > 0 && this.discussions[0].categorie) {
          this.categorieNom = this.discussions[0].categorie.nom;
        } else {
          this.categorieNom = 'Discussions de la catégorie';
        }
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erreur', err)
    });
  }

  ouvrirModal() {
    const utilisateurConnecte = this.authService.currentUserValue;

    if (!utilisateurConnecte) {

      this.showLoginPrompt = true;
      return;
    }

    // Si connecté, on prépare les infos et on ouvre la modale de création
    this.nouvelleDiscussion.nomAuteur = utilisateurConnecte.prenom + ' ' + utilisateurConnecte.nom;
    this.nouvelleDiscussion.initialesAuteur = (utilisateurConnecte.prenom.charAt(0) + utilisateurConnecte.nom.charAt(0)).toUpperCase();
    this.isModalOpen = true;
  }

  fermerModal() {
    this.isModalOpen = false;
    this.nouvelleDiscussion = {
      titre: '',
      typeSujet: this.sujetsPredefinis[0],
      nomAuteur: 'Jean Kouassi',
      initialesAuteur: 'JK',
      epingle: false,
      nombreReponses: 0,
      nombreVues: 0
    };
  }

  creerDiscussion() {
    if (!this.nouvelleDiscussion.titre.trim()) return;

    this.forumService.creerDiscussion(this.nouvelleDiscussion, this.categorieId).subscribe({
      next: (nouvelle: Discussion) => {
        this.fermerModal();
        // Redirection vers le salon de chat qu'on vient de créer !
        this.router.navigate(['/communaute/discussion', nouvelle.id]);
      },
      error: (err: any) => {
        console.error('Erreur création côté API', err);
        // Cette alerte va t'afficher l'erreur si Spring Boot refuse la requête !
        alert("Oups ! Impossible de publier.");
      }
    });
  }

  fermerLoginPrompt() {
    this.showLoginPrompt = false;
  }

  allerVersConnexion() {
    this.router.navigate(['/auth']);
  }
  retour() {
    this.location.back();
  }
}
