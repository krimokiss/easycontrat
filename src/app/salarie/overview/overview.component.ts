import { DataService } from 'src/app/services/data.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OverviewComponent implements OnInit {
  
  profil!:any

  constructor(private dataService : DataService) { }

  ngOnInit(): void {
    this.dataService.getProfil().subscribe((response:any)=>{
        this.profil = response
    })
  
  }

  logOutClick(): void {
    this.dataService.clearToken()
  }

}
