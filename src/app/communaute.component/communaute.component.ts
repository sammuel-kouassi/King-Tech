import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ForumService } from '../services/forum.service';
import { ExpertService } from '../services/expert.service';
import { AuthService } from '../services/auth.service';
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

  searchTerm: string = '';
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
    // Chargement des Catégories
    this.forumService.getCategories().subscribe({
      next: (data) => { this.categories = data; this.cdr.detectChanges(); },
      error: (err) => console.error('Erreur catégories', err)
    });

    // Chargement des Discussions
    this.forumService.getDernieresDiscussions().subscribe({
      next: (data) => { this.discussions = data; this.cdr.detectChanges(); },
      error: (err) => console.error('Erreur discussions', err)
    });

    // Chargement des Experts depuis Spring Boot
    this.expertService.getExperts().subscribe({
      next: (data) => {
        this.experts = data;
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
      this.chargerListeContacts();
    }
    this.cdr.detectChanges();
  }

  chargerListeContacts() {
    if (this.utilisateurActuel && this.utilisateurActuel.role === 'EXPERT') {
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

  chargerConversationExpert() {
    if (!this.utilisateurActuel || !this.contactSelectionne) {
      console.log("Erreur : Utilisateur ou Contact manquant !");
      return;
    }

    this.expertService.getConversation(this.utilisateurActuel.id, this.contactSelectionne.id)
      .subscribe({
        next: (data) => {
          this.messagesExpert = data;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error("Aïe ! Erreur serveur :", err);
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

  fermerLoginPrompt() { this.showLoginPrompt = false; }

  // Correction de la promesse ignorée du linter
  allerVersConnexion() { this.router.navigate(['/auth']).then(); }

  // --- FILTRES CORRIGÉS ---
  get filteredCategories() {
    if (!this.searchTerm.trim()) return this.categories; // Corrigé : categories au lieu de categoriesForum
    const term = this.searchTerm.toLowerCase();
    return this.categories.filter((cat: any) =>
      cat.nom.toLowerCase().includes(term) ||
      cat.description.toLowerCase().includes(term)
    );
  }

  get filteredDiscussions() {
    if (!this.searchTerm.trim()) return this.discussions;
    const term = this.searchTerm.toLowerCase();
    return this.discussions.filter((disc: any) =>
      disc.titre.toLowerCase().includes(term) ||
      disc.nomAuteur.toLowerCase().includes(term) // Corrigé : Utilise nomAuteur au lieu de auteur
    );
  }

  get filteredContacts() {
    if (!this.searchTerm.trim()) return this.contacts;
    const term = this.searchTerm.toLowerCase();
    return this.contacts.filter((contact: any) =>
      contact.nom.toLowerCase().includes(term) ||
      contact.prenom.toLowerCase().includes(term) ||
      (contact.specialite && contact.specialite.toLowerCase().includes(term))
    );
  }
}
