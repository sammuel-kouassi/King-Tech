import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbar } from './navbar/navbar';
import { HeroComponent } from './hero.component/hero.component';
import { FeaturesBarComponent } from './features-bar.component/features-bar.component';
import { PopularProductsComponent } from './popular-products.component/popular-products.component';
import { CategoriesComponent } from './categories.component/categories.component';
import { NewsletterComponent } from './newsletter.component/newsletter.component';
import { FooterComponent } from './footer.component/footer.component';
import { HomeComponent } from './home.component/home.component';
import { FormationComponent } from './formation.component/formation.component';
import { CartComponent } from './cart.component/cart.component';
import { AProposComponent } from './pages/a-propos.component/a-propos.component';
import { RetoursComponent } from './pages/retours.component/retours.component';
import { CheckoutComponent } from './checkout.component/checkout.component';
import { SuccessComponent } from './success.component/success.component';
import { Partenaire } from './partenaire/partenaire';
import { BoutiqueComponent } from './boutique.component/boutique.component';
import { ProductDetailComponent } from './product-detail.component/product-detail.component';
import {provideHttpClient} from '@angular/common/http';
import { AdminDashboardComponent } from './admin-dashboard.component/admin-dashboard.component';
import { CategorieDetailComponent } from './categorie-detail.component/categorie-detail.component';
import { DiscussionDetailComponent } from './discussion-detail.component/discussion-detail.component';
import { LoginComponent } from './login.component/login.component';
import { AuthComponent } from './auth.component/auth.component';

@NgModule({
  declarations: [
    App,
    Navbar,
    HeroComponent,
    FeaturesBarComponent,
    PopularProductsComponent,
    FooterComponent,
    HomeComponent,
    FormationComponent,
    AProposComponent,
    RetoursComponent,
    Partenaire,
    AdminDashboardComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    NewsletterComponent,
    CategoriesComponent,
    BoutiqueComponent,
    ProductDetailComponent,
    CategorieDetailComponent,
    DiscussionDetailComponent,
    AuthComponent,
    CartComponent,
    CheckoutComponent,
    SuccessComponent,
    NgOptimizedImage
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient()
  ],
  bootstrap: [App]
})
export class AppModule { }
