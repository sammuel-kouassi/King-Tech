import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewsletterService } from '../services/newsletter.service';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent {

  private newsletterService = inject(NewsletterService);
  private cdr = inject(ChangeDetectorRef);

  emailNewsletter: string = '';
  messageNewsletter: string = '';
  isErrorNewsletter: boolean = false;
  isLoadingNewsletter: boolean = false;

  sInscrireNewsletter() {
    if (!this.emailNewsletter || !this.emailNewsletter.includes('@')) {
      this.isErrorNewsletter = true;
      this.messageNewsletter = "Veuillez entrer une adresse email valide.";
      this.cdr.detectChanges();
      return;
    }

    this.isLoadingNewsletter = true;
    this.messageNewsletter = '';
    this.cdr.detectChanges();

    this.newsletterService.subscribe(this.emailNewsletter).subscribe({
      next: (response) => {
        this.isErrorNewsletter = false;
        this.messageNewsletter = response.message || "Merci pour votre inscription !";
        this.emailNewsletter = '';
        this.isLoadingNewsletter = false;

        this.cdr.detectChanges();

        setTimeout(() => {
          this.messageNewsletter = '';
          this.cdr.detectChanges();
        }, 4000);
      },
      error: (err) => {
        this.isErrorNewsletter = true;
        this.messageNewsletter = err.error?.message || "Une erreur est survenue. Veuillez réessayer.";
        this.isLoadingNewsletter = false;

        this.cdr.detectChanges();
      }
    });
  }
}
