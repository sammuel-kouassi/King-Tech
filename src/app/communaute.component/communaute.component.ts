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
  imports: [CommonModule, RouterLink, FormsModule],
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

  experts: any[] = [];
  selectedExpert: any = null;
  messagesExpert: any[] = [];
  nouveauMessageExpert: string = '';
  isExpertMode = false;
  contacts: any[] = [];
  contactSelectionne: any = null;


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
    if (onglet === 'expert') {
      this.utilisateurActuel = this.authService.currentUserValue;
      this.chargerListeContacts(); // On charge la bonne liste selon le rôle !
    }
    this.cdr.detectChanges();
  }

  chargerListeContacts() {
    if (this.utilisateurActuel && this.utilisateurActuel.role === 'EXPERT') {
      // MODE EXPERT : On charge ses clients
      this.isExpertMode = true;
      this.expertService.getClientsPourExpert(this.utilisateurActuel.id).subscribe({
        next: (data) => {
          this.contacts = data;
          if (this.contacts.length > 0) {
            this.selectContact(this.contacts[0]);
          }
          this.cdr.detectChanges();
        }
      });
    } else {
      // MODE CLIENT (ou non connecté) : On charge les experts
      this.isExpertMode = false;
      this.expertService.getExperts().subscribe({
        next: (data) => {
          this.contacts = data;
          if (this.contacts.length > 0) {
            this.selectContact(this.contacts[0]);
          }
          this.cdr.detectChanges();
        }
      });
    }
  }

  selectContact(contact: any) {
    this.contactSelectionne = contact;
    this.chargerConversationExpert();
  }
  // --- LOGIQUE DE MESSAGERIE EXPERT ---

  selectExpert(expert: any) {
    this.selectedExpert = expert;
    this.chargerConversationExpert();
  }

  chargerConversationExpert() {
    if (!this.utilisateurActuel || !this.contactSelectionne) {
      console.log("Erreur : Utilisateur ou Contact manquant !");
      return;
    }

    console.log("--> DÉMARRAGE DU CHAT <--");
    console.log("1. Mon ID (Moi) :", this.utilisateurActuel.id);
    console.log("2. ID du Contact (Lui) :", this.contactSelectionne.id);

    this.expertService.getConversation(this.utilisateurActuel.id, this.contactSelectionne.id)
      .subscribe({
        next: (data) => {
          console.log("3. Succès ! Messages reçus :", data);
          this.messagesExpert = data;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error("3. Aïe ! Erreur serveur :", err);
        }
      });
  }

  envoyerMessageExpert() {
    if (!this.utilisateurActuel) { this.showLoginPrompt = true; return; }
    if (!this.nouveauMessageExpert.trim() || !this.contactSelectionne) return;

    this.expertService.envoyerMessage(
      this.utilisateurActuel.id,
      this.contactSelectionne.id,
      this.nouveauMessageExpert
    ).subscribe({
      next: (msg) => {
        this.messagesExpert.push(msg);
        this.nouveauMessageExpert = '';
        this.cdr.detectChanges();
      }
    });
  }

  // Gestion de la modale de connexion
  fermerLoginPrompt() { this.showLoginPrompt = false; }
  allerVersConnexion() { this.router.navigate(['/auth']); }
}
