import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gerer-contrat-ent',
  templateUrl: './gerer-contrat-ent.component.html',
  styleUrls: ['./gerer-contrat-ent.component.scss']
})
export class GererContratEntComponent implements OnInit {

  profilEntreprise!: any
  allContrat!: any
  allSalarie!: any
  singlecontrat!: any
  contratByEnt!: any
  contratBySalarie!: any
  allContratFiltered!: any
  searchBar: FormControl = new FormControl()

  constructor(private dataService: DataService,
    private router: Router) { }

  ngOnInit(): void {

    this.dataService.getProfilEntreprise().subscribe((response: any) => {
      if (response && response[0]) {
        this.profilEntreprise = response[0]
        console.log('Profil entreprise', this.profilEntreprise);

      }
    })
    this.dataService.getallContrat().subscribe((response: any) => {
      if (response && response) {
        this.allContrat = response
        console.log('Contrats', response);

      }
    })

    this.dataService.getAllSalarie().subscribe((response: any) => {
      this.allSalarie = response
      console.log('allSalarie', response);

    })
    this.dataService.getallContratByEnt().subscribe((result: any) => {
      this.contratByEnt = result
      console.warn(result);
      this.allContratFiltered = [...this.contratByEnt]

    })
    this.dataService.getallContratBySalarie().subscribe((result: any) => {
      this.contratBySalarie = result
      console.warn('contratBysalarie', result);

    })
    this.searchBar.valueChanges.subscribe((resultats: any) => {

      this.allContratFiltered = this.contratByEnt.filter((user: any) => {

        return user.fonction.toLowerCase().includes(resultats.toLowerCase()) ||
          user.satut.toLowerCase().includes(resultats.toLowerCase())
      })
    })

  }

  onSubmit(id: any) {

    this.dataService.deleteContrat(id).subscribe((response: any) => {

      console.log('response', response);
      return window.location.reload()

    })



  }

}
