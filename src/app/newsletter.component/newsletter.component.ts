import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent {

  // Méthode appelée lors de la soumission du formulaire
  onSubmit(event: Event) {
    event.preventDefault(); // Empêche le rechargement de la page
    alert('Merci pour votre inscription à la newsletter ! (Ceci est une démo)');
  }
}
