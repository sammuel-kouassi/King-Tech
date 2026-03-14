import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ForumService } from '../services/forum.service';
import { Discussion, MessageForum } from '../models/forum.model';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-discussion-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './discussion-detail.component.html',
  styleUrls: ['./discussion-detail.component.css']
})
export class DiscussionDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private forumService = inject(ForumService);
  private cdr = inject(ChangeDetectorRef);
  private location = inject(Location);
  private authService = inject(AuthService);
  private router = inject(Router);


  showLoginPrompt = false;

  discussionId!: number;
  discussion!: Discussion;
  messages: MessageForum[] = [];

  nouveauMessage = {
    contenu: '',
    nomAuteur: '',
    initialesAuteur: ''
  };

  ngOnInit() {
    this.discussionId = Number(this.route.snapshot.paramMap.get('id'));
    this.chargerDiscussionEtMessages();
  }

  chargerDiscussionEtMessages() {
    this.forumService.getDiscussion(this.discussionId).subscribe((data) => {
      this.discussion = data;
      this.cdr.detectChanges();
    });

    this.forumService.getMessages(this.discussionId).subscribe((data) => {
      this.messages = data;
      this.cdr.detectChanges();
    });
  }

  envoyerMessage() {
    if (!this.nouveauMessage.contenu.trim()) return;

    const utilisateurConnecte = this.authService.currentUserValue;

    if (!utilisateurConnecte) {
      // On bloque l'envoi et on affiche la belle modale
      this.showLoginPrompt = true;
      return;
    }

    // Si connecté, on signe le message et on l'envoie à l'API
    this.nouveauMessage.nomAuteur = utilisateurConnecte.prenom + ' ' + utilisateurConnecte.nom;
    this.nouveauMessage.initialesAuteur = (utilisateurConnecte.prenom.charAt(0) + utilisateurConnecte.nom.charAt(0)).toUpperCase();

    this.forumService.ajouterMessage(this.discussionId, this.nouveauMessage).subscribe({
      next: (msg) => {
        this.messages.push(msg);
        this.nouveauMessage.contenu = '';
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erreur', err)
    });
  }

  // NOUVELLES MÉTHODES POUR LA MODALE
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
