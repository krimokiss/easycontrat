import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Salarie } from 'src/app/models/salarie.model';
import { Entreprise } from 'src/app/models/entreprise.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  inscription = new FormControl('');
  loginForm!: FormGroup;
  email!: string;
  mdp!: string
  salarie = new Salarie
  entreprise = new Entreprise

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [this.email, [Validators.required]],
      mdp: [this.mdp, [Validators.required]]
    })
  }

  onSubmit() {
    const form = this.loginForm.value
    this.salarie = Object.assign(this.salarie, form)

    this.entreprise = Object.assign(this.entreprise, form)

    this.dataService.salarieLogin(this.salarie).subscribe((result: Salarie) =>{
      if (result) {
        localStorage.setItem('token',(result.token))
        // localStorage.setItem('user', JSON.stringify(this.email))
        this.router.navigate(['/salarie/overview'])
        console.log(result);
        
      }
    })
  }

}
