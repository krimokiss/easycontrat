import { MatSnackBar } from '@angular/material/snack-bar';
import { Salarie } from 'src/app/models/salarie.model';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-gerer-profil',
  templateUrl: './gerer-profil.component.html',
  styleUrls: ['./gerer-profil.component.scss']
})
export class GererProfilComponent implements OnInit {

  editValue :string =  '';
  salarie: Salarie = new Salarie();

profil!: any

  constructor(private router : Router,
              private dataService : DataService,
              private matDialog : MatDialog,
              private snackBar : MatSnackBar) { }

  ngOnInit(): void {
  this.dataService.getProfil().subscribe((response:any)=>{
    if (response && response) {
      this.profil = response
    }
   
  })
  this.editValue = '';
  this.salarie = new Salarie();
  }

  updateSalarie() {
    
    console.warn('salarie',this.profil);
    
    this.dataService.updateSalarie(this.profil, this.profil.salarie_id).subscribe(res => {
      this.ngOnInit()
      this.snackBar.open("Mofication prise en compte  " + ' ' , '', { duration: 2000 })
    }, err => {
      alert('Mise a jour impossible')
    })
  }

  call(worker : any) {
    this.salarie = worker;
    this.editValue = worker;
    console.log(worker);
    
  }

}
