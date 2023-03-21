import { Entreprise } from './../../models/entreprise.model';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-overviewentreprise',
  templateUrl: './overviewentreprise.component.html',
  styleUrls: ['./overviewentreprise.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OverviewentrepriseComponent implements OnInit {

   // Déclare une variable profil de type Entreprise avec une instance vide
  profil= new Entreprise()

   // Injecte le service DataService dans le constructeur
  constructor(private dataService : DataService) { }

  // La méthode ngOnInit est appelée lorsque le composant est initialisé
  ngOnInit(): void {
    // Appelle la méthode getProfilEntreprise du service DataService
    this.dataService.getProfilEntreprise().subscribe((response:any)=>{
      // Stocke la réponse dans la variable profil qui est maintenant instancié
        this.profil = response
    })
  }
  
  // La méthode logOutClick est appelée lorsque l'utilisateur clique sur un bouton de déconnexion
  logOutClick(): void {
     // Appelle la méthode clearToken du service DataService pour déconnecter l'utilisateur
    this.dataService.clearToken()
  }

}
