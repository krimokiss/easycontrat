import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gerer-salaries-ent',
  templateUrl: './gerer-salaries-ent.component.html',
  styleUrls: ['./gerer-salaries-ent.component.scss']
})
export class GererSalariesEntComponent implements OnInit {

  allSalarie!: any
  profil!: any
  allcontrat !: any
  allSalarieFiltered!: any
  searchBar: FormControl = new FormControl()


  constructor(private dataService: DataService,
    private router: Router) { }

  ngOnInit(): void {
    this.dataService.getAllSalarie().subscribe((response: any) => {
      this.allSalarie = response
      console.log('allSalarie', response);
this.allSalarieFiltered = [...this.allSalarie]
    })
    this.dataService.getProfilEntreprise().subscribe((response: any) => {
      if (response && response[0]) {
        this.profil = response[0]
      }
      this.dataService.getallContrat().subscribe((response:any)=>{
        this.allcontrat = response
        console.log('allContrat', response);
        
      })

    })



    this.searchBar.valueChanges.subscribe((resultats: any) => {
        
      this.allSalarieFiltered = this.allSalarie.filter((user: any) => {
             
        return user.nom.toLowerCase().includes(resultats.toLowerCase()) ||
                user.prenom.toLowerCase().includes(resultats.toLowerCase())
      })
    })
    
  }
  onSubmit(id:any){

    this.dataService.deleteSalarie(id).subscribe((response:any)=>{
    
      console.log('response',response);
      return window.location.reload()
      
    })
      
      
    }

}
