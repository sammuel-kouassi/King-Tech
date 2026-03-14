import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- INDISPENSABLE POUR LE CHAT
import { RouterLink, Router } from '@angular/router'; // <-- AJOUT DE ROUTER
import { ForumService } from '../services/forum.service';
import { ExpertService } from '../services/expert.service'; // <-- AJOUT
import { AuthService } from '../services/auth.service'; // <-- AJOUT
import { Categorie, Discussion } from '../models/forum.model';

@Component({
  selector: 'app-communaute',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule], // <-- AJOUTER FormsModule
  templateUrl: './communaute.component.html',
  styleUrls: ['./communaute.component.css']
})
export class CommunauteComponent implements OnInit {
  private forumService = inject(ForumService);
  private expertService = inject(ExpertService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  ongletActif: 'categories' | 'discussions' | 'expert' = 'categories';

  categories: Categorie[] = [];
  discussions: Discussion[] = [];

  // --- VARIABLES POUR L'ONGLET EXPERT ---
  experts: any[] = [];
  selectedExpert: any = null;
  messagesExpert: any[] = [];
  nouveauMessageExpert: string = '';

  utilisateurActuel: any = null;
  showLoginPrompt = false;

  stats = {
    membres: 0,
    messages: 0,
    experts: 0
  };

  ngOnInit() {
    this.utilisateurActuel = this.authService.currentUserValue;
    this.chargerDonnees();
  }

  chargerDonnees() {
    // 1. Chargement des Catégories
    this.forumService.getCategories().subscribe({
      next: (data) => { this.categories = data; this.cdr.detectChanges(); },
      error: (err) => console.error('Erreur catégories', err)
    });

    // 2. Chargement des Discussions
    this.forumService.getDernieresDiscussions().subscribe({
      next: (data) => { this.discussions = data; this.cdr.detectChanges(); },
      error: (err) => console.error('Erreur discussions', err)
    });

    // 3. NOUVEAU : Chargement des Experts depuis Spring Boot
    this.expertService.getExperts().subscribe({
      next: (data) => {
        this.experts = data;
        // On sélectionne le premier expert par défaut s'il y en a un
        if (this.experts.length > 0) {
          this.selectedExpert = this.experts[0];
          this.chargerConversationExpert();
        }
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erreur experts', err)
    });

    this.forumService.getStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erreur stats', err)
    });
  }

  changerOnglet(onglet: 'categories' | 'discussions' | 'expert') {
    this.ongletActif = onglet;
    // Si on bascule sur l'onglet expert, on recharge la conversation au cas où
    if (onglet === 'expert') {
      this.utilisateurActuel = this.authService.currentUserValue;
      this.chargerConversationExpert();
    }
    this.cdr.detectChanges();
  }

  // --- LOGIQUE DE MESSAGERIE EXPERT ---

  selectExpert(expert: any) {
    this.selectedExpert = expert;
    this.chargerConversationExpert();
  }

  chargerConversationExpert() {
    if (!this.utilisateurActuel || !this.selectedExpert) return;

    this.expertService.getConversation(this.utilisateurActuel.id, this.selectedExpert.id)
      .subscribe({
        next: (data) => {
          this.messagesExpert = data;
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Erreur chat', err)
      });
  }

  envoyerMessageExpert() {
    // Le vigile bloque si non connecté
    if (!this.utilisateurActuel) {
      this.showLoginPrompt = true;
      return;
    }

    if (!this.nouveauMessageExpert.trim() || !this.selectedExpert) return;

    this.expertService.envoyerMessage(
      this.utilisateurActuel.id,
      this.selectedExpert.id,
      this.nouveauMessageExpert
    ).subscribe({
      next: (msg) => {
        this.messagesExpert.push(msg); // Ajoute la bulle à l'écran
        this.nouveauMessageExpert = ''; // Vide l'input
        this.cdr.detectChanges();
      },
      error: (err) => console.error("Erreur envoi message", err)
    });
  }

  // Gestion de la modale de connexion
  fermerLoginPrompt() { this.showLoginPrompt = false; }
  allerVersConnexion() { this.router.navigate(['/auth']); }
}
