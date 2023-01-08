import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
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

  // entreprise: Entreprise = new Entreprise();
  profil= new Entreprise()
  pageLoading!: boolean

  constructor(private dataService : DataService,
    private router : Router) { }

  ngOnInit(): void {
    this.dataService.getProfilEntreprise().subscribe((response:any)=>{
   
        this.profil = response
      
     
    })
    this.router.events.subscribe(event => {
      switch(true) {
        case event instanceof NavigationStart: {
          this.pageLoading = true;
          console.info('loading', this.pageLoading);
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          console.info('loading', this.pageLoading);
          this.pageLoading = false;
          break;
        }
      }
    })
  }
  
  logOutClick(): void {
    this.dataService.clearToken()
  }

}
