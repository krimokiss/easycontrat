import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
  isLoading =false

  spinnerButtonOptions: any = {
    active: false,
    text: 'Spinner Button',
    spinnerSize: 18,
    raised: true,
    buttonColor: 'primary',
    spinnerColor: 'accent'
  }

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({profil})=>{
  console.log('PROFIL RESOLVER', profil);
  
})
    this.loginForm = this.formBuilder.group({
      email: [this.email, [Validators.required]],
      mdp: [this.mdp, [Validators.required]]
    })
  }

  onSubmit() {
    const form = this.loginForm.value
    this.salarie = Object.assign(this.salarie, form)

    this.entreprise = Object.assign(this.entreprise, form)

    this.dataService.salarieLogin(this.salarie).subscribe((result: any) =>{
      if (result) {
        localStorage.setItem('token',(result.token))
        localStorage.setItem('role',(result.datas.role))
        // localStorage.setItem('user', JSON.stringify(this.email))
        this.router.navigate(['/salarie/overview/gerer-profil'])
        // console.log(result.datas.role);
        
      }
    })
    this.isLoading = true;
    setTimeout(() => this.isLoading = false, 5000);
  }

}
