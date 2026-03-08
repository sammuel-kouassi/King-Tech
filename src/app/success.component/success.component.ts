import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  userName: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // On récupère le nom passé dans l'URL
    this.route.queryParams.subscribe(params => {
      this.userName = params['user'] || 'Cher Client';
    });
  }

  printInvoice() {
    window.print();
  }
}
