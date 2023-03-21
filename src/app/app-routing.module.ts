import { GererFactureEntComponent } from './entreprise/gerer-facture-ent/gerer-facture-ent.component';
import { FactureModalComponent } from './modals/facture-modal/facture-modal.component';
import { GenererFactureComponent } from './entreprise/generer-facture/generer-facture.component';
import { ProfilResolverResolver } from './resolver/profil-resolver.resolver';
import { GuardEntrepriseGuard } from './helpers/guard-entreprise.guard';
import { ContratResolverResolver } from './resolver/contrat-resolver.resolver';
import { DetailsModalComponent } from './modals/details-modal/details-modal.component';
import { ContratModalComponent } from './modals/contrat-modal/contrat-modal.component';
import { GenererContratComponent } from './entreprise/generer-contrat/generer-contrat.component';
import { GererSalariesEntComponent } from './entreprise/gerer-salaries-ent/gerer-salaries-ent.component';
import { GererContratEntComponent } from './entreprise/gerer-contrat-ent/gerer-contrat-ent.component';
import { GererProfilEntComponent } from './entreprise/gerer-profil-ent/gerer-profil-ent.component';
import { GererContratComponent } from './salarie/gerer-contrat/gerer-contrat.component';
import { GererProfilComponent } from './salarie/gerer-profil/gerer-profil.component';
import { OverviewentrepriseComponent } from './entreprise/overviewentreprise/overviewentreprise.component';
import { OverviewComponent } from './salarie/overview/overview.component';
import { RegisterentrepriseComponent } from './entreprise/registerentreprise/registerentreprise.component';
import { RegisterComponent } from './salarie/register/register.component';
import { LoginentrepriseComponent } from './entreprise/loginentreprise/loginentreprise.component';
import { AccueilComponent } from './accueil/accueil.component';
import { LoginComponent } from './salarie/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardGuard } from './helpers/guard.guard';

const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'salarie/login', component: LoginComponent },
  { path: 'entreprise/login', component: LoginentrepriseComponent },
  { path: 'salarie/register', component: RegisterComponent },
  { path: 'entreprise/register', component: RegisterentrepriseComponent },
  {
    path: 'salarie/overview', canActivate:[GuardGuard], component: OverviewComponent, resolve:{profil:ProfilResolverResolver},
    children: [
      { path: 'gerer-profil', canActivate:[GuardGuard], component: GererProfilComponent },
      { path: 'gerer-contrat', canActivate:[GuardGuard], component: GererContratComponent },
      {path : 'details-modal', component : DetailsModalComponent, }
    ]
  },
  {
    path: 'entreprise/overview', canActivate :[GuardEntrepriseGuard], component: OverviewentrepriseComponent, resolve:{contrats:ContratResolverResolver},
    children: [
      { path: 'gerer-profil-ent', canActivate :[GuardEntrepriseGuard], component: GererProfilEntComponent },
      { path: 'gerer-contrat-ent', canActivate :[GuardEntrepriseGuard], component: GererContratEntComponent},
      { path: 'gerer-facture-ent', canActivate : [GuardEntrepriseGuard], component: GererFactureEntComponent},
      {path : 'details-modal', component : DetailsModalComponent, },
      { path: 'gerer-salaries-ent', canActivate :[GuardEntrepriseGuard], component: GererSalariesEntComponent },
      { path: 'generer-contrat', canActivate :[GuardEntrepriseGuard], component: GenererContratComponent,
    children: [{path : 'contrat-modal', component: ContratModalComponent}] },
      { path: 'generer-facture', canActivate : [GuardEntrepriseGuard], component: GenererFactureComponent,
    children: [{path : 'facture-modal', component: FactureModalComponent}]}
    ]
  }
];
// resolve:{profile:UserResolverResolver}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
