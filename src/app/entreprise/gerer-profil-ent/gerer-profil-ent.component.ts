import { Entreprise } from 'src/app/models/entreprise.model';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-gerer-profil-ent',
  templateUrl: './gerer-profil-ent.component.html',
  styleUrls: ['./gerer-profil-ent.component.scss']
})
export class GererProfilEntComponent implements OnInit {

  editValue : string = '';
  entreprise: Entreprise = new Entreprise();
  profil!: any

  constructor(private router : Router,
    private dataService : DataService,
    private snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.dataService.getProfilEntreprise().subscribe((response:any)=>{
      if (response && response) {
        this.profil = response
      }
     
    })
    this.editValue = '';
    this.entreprise = new Entreprise();
  }

  updateProfil() {
    
    console.warn('User',this.profil);
    
    this.dataService.updateEntreprise(this.profil, this.profil.entreprise_id).subscribe(res => {
      this.ngOnInit()
      this.snackBar.open("Mofication prise en compte  " + ' ' , '', { duration: 2000 })
    }, err => {
      alert('Mise a jour impossible')
    })
  }

}
