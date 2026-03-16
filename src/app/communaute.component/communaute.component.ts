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

  // Variables d'état
  utilisateurActuel: any = null;
  showLoginPrompt = false;
  showCreationModal = false; // <-- Pour le formulaire

  // Données du nouveau sujet
  nouveauSujet = {
    titre: '',
    categorieId: '',
    message: ''
  };

  stats = { membres: 0, messages: 0, experts: 0 };

  // Variables chat Expert
  contacts: any[] = [];
  contactSelectionne: any = null;
  messagesExpert: any[] = [];
  nouveauMessageExpert: string = '';
  isExpertMode = false;

  ngOnInit() {
    this.utilisateurActuel = this.authService.currentUserValue;
    this.chargerDonnees();
  }

  chargerDonnees() {
    this.forumService.getCategories().subscribe(data => { this.categories = data; this.cdr.detectChanges(); });
    this.forumService.getDernieresDiscussions().subscribe(data => { this.discussions = data; this.cdr.detectChanges(); });
    this.expertService.getExperts().subscribe(data => { this.experts = data; this.cdr.detectChanges(); });
    this.forumService.getStats().subscribe(data => { this.stats = data; this.cdr.detectChanges(); });
  }

  creerDiscussion() {
    if (!this.utilisateurActuel) {
      this.showLoginPrompt = true;
    } else {
      this.showCreationModal = true;
    }
    this.cdr.detectChanges();
  }

  fermerModal() {
    this.showCreationModal = false;
    this.cdr.detectChanges();
  }

  publierSujet() {
    console.log("Sujet à publier :", this.nouveauSujet);
    // Ici tu feras appel à ton forumService.createSujet() plus tard
    this.fermerModal();
  }

  changerOnglet(onglet: any) {
    this.ongletActif = onglet;
    if (onglet === 'expert') this.chargerListeContacts();
    this.cdr.detectChanges();
  }

  // ... (Garde tes méthodes selectContact, chargerConversationExpert, etc. à l'identique)

  chargerListeContacts() {
    const service = (this.utilisateurActuel?.role === 'EXPERT') ?
      this.expertService.getClientsPourExpert(this.utilisateurActuel.id) :
      this.expertService.getExperts();

    service.subscribe(data => {
      this.contacts = data;
      if (this.contacts.length > 0) this.selectContact(this.contacts[0]);
      this.cdr.detectChanges();
    });
  }

  selectContact(contact: any) {
    this.contactSelectionne = contact;
    this.chargerConversationExpert();
  }

  chargerConversationExpert() {
    if (!this.utilisateurActuel || !this.contactSelectionne) return;
    this.expertService.getConversation(this.utilisateurActuel.id, this.contactSelectionne.id)
      .subscribe(data => { this.messagesExpert = data; this.cdr.detectChanges(); });
  }

  envoyerMessageExpert() {
    if (!this.utilisateurActuel) { this.showLoginPrompt = true; return; }
    if (!this.nouveauMessageExpert.trim() || !this.contactSelectionne) return;
    this.expertService.envoyerMessage(this.utilisateurActuel.id, this.contactSelectionne.id, this.nouveauMessageExpert)
      .subscribe(msg => { this.messagesExpert.push(msg); this.nouveauMessageExpert = ''; this.cdr.detectChanges(); });
  }

  fermerLoginPrompt() { this.showLoginPrompt = false; }
  allerVersConnexion() { this.router.navigate(['/auth']).then(); }

  get filteredCategories() {
    const term = this.searchTerm.toLowerCase();
    return this.categories.filter(c => c.nom.toLowerCase().includes(term));
  }
  get filteredDiscussions() {
    const term = this.searchTerm.toLowerCase();
    return this.discussions.filter(d => d.titre.toLowerCase().includes(term));
  }
  get filteredContacts() {
    const term = this.searchTerm.toLowerCase();
    return this.contacts.filter(c => c.nom.toLowerCase().includes(term));
  }
}
