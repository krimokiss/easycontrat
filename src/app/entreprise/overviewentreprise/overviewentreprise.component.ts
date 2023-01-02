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

  entreprise: Entreprise = new Entreprise();
  profil!: any

  constructor(private dataService : DataService) { }

  ngOnInit(): void {
    this.dataService.getProfilEntreprise().subscribe((response:any)=>{
      if (response && response[0]) {
        this.profil = response[0]
      }
     
    })
    this.entreprise = new Entreprise();
  }
  logOutClick(): void {
    this.dataService.clearToken()
  }

}
