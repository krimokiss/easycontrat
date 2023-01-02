import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './salarie/register/register.component';
import { LoginComponent } from './salarie/login/login.component';
import { OverviewComponent } from './salarie/overview/overview.component';
import { AccueilComponent } from './accueil/accueil.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { LoginentrepriseComponent } from './entreprise/loginentreprise/loginentreprise.component';
import { RegisterentrepriseComponent } from './entreprise/registerentreprise/registerentreprise.component';
import { OverviewentrepriseComponent } from './entreprise/overviewentreprise/overviewentreprise.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar'
import { TokenInterceptorPovider } from 'src/helpers/token.interceptor';
import { GererProfilComponent } from './salarie/gerer-profil/gerer-profil.component';
import { GererContratComponent } from './salarie/gerer-contrat/gerer-contrat.component';
import { MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import { GererContratEntComponent } from './entreprise/gerer-contrat-ent/gerer-contrat-ent.component';
import { GererProfilEntComponent } from './entreprise/gerer-profil-ent/gerer-profil-ent.component';
import { GererSalariesEntComponent } from './entreprise/gerer-salaries-ent/gerer-salaries-ent.component';
import { GenererContratComponent } from './entreprise/generer-contrat/generer-contrat.component';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ContratModalComponent } from './modals/contrat-modal/contrat-modal.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatPaginatorModule} from '@angular/material/paginator';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    OverviewComponent,
    AccueilComponent,
    LoginentrepriseComponent,
    RegisterentrepriseComponent,
    OverviewentrepriseComponent,
    GererProfilComponent,
    GererContratComponent,
    GererContratEntComponent,
    GererProfilEntComponent,
    GererSalariesEntComponent,
    GenererContratComponent,
    ContratModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    NgbModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDividerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatCardModule,
    MatStepperModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    MatPaginatorModule
  ],
  providers: [TokenInterceptorPovider,
    { provide: LOCALE_ID, useValue: 'fr-FR'}],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(){
    registerLocaleData(fr.default);
  }
 }
