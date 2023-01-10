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

  profil= new Entreprise()

  constructor(private dataService : DataService) { }

  ngOnInit(): void {
    this.dataService.getProfilEntreprise().subscribe((response:any)=>{
        this.profil = response
    })
  }
  
  logOutClick(): void {
    this.dataService.clearToken()
  }

}
