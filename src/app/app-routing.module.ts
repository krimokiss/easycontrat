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

const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'salarie/login', component: LoginComponent },
  { path: 'entreprise/login', component: LoginentrepriseComponent },
  { path: 'salarie/register', component: RegisterComponent },
  { path: 'entreprise/register', component: RegisterentrepriseComponent },
  {
    path: 'salarie/overview', component: OverviewComponent,
    children: [
      { path: 'gerer-profil', component: GererProfilComponent },
      { path: 'gerer-contrat', component: GererContratComponent }
    ]
  },
  {
    path: 'entreprise/overview', component: OverviewentrepriseComponent,
    children: [
      { path: 'gerer-profil-ent', component: GererProfilEntComponent },
      { path: 'gerer-contrat-ent', component: GererContratEntComponent },
      { path: 'gerer-salaries-ent', component: GererSalariesEntComponent },
      { path: 'generer-contrat', component: GenererContratComponent,
    children: [{path : 'contrat-modal', component: ContratModalComponent}] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
