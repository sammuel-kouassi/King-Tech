import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component/home.component';
import { BoutiqueComponent } from './boutique.component/boutique.component';
import {ProductDetailComponent} from './product-detail.component/product-detail.component';
import { CommunauteComponent } from './communaute.component/communaute.component';
import { FormationComponent } from './formation.component/formation.component';
import {AProposComponent} from './pages/a-propos.component/a-propos.component';
import {RetoursComponent} from './pages/retours.component/retours.component';
import {CheckoutComponent} from './checkout.component/checkout.component';
import {SuccessComponent} from './success.component/success.component';
import {AdminDashboardComponent} from './admin-dashboard.component/admin-dashboard.component';
import {CategorieDetailComponent} from './categorie-detail.component/categorie-detail.component';
import {DiscussionDetailComponent} from './discussion-detail.component/discussion-detail.component';
import {AuthComponent} from './auth.component/auth.component';
import {LeconComponent} from './lecon.component/lecon.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'boutique', component: BoutiqueComponent },
  { path: 'produit/:id', component: ProductDetailComponent },
  { path: 'communaute', component: CommunauteComponent },
  { path: 'formation', component: FormationComponent },
  { path: 'a-propos', component: AProposComponent },
  { path: 'retours', component: RetoursComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'communaute/categorie/:id', component: CategorieDetailComponent },
  { path: 'communaute/discussion/:id', component: DiscussionDetailComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'lecon/:type/:id', component: LeconComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
