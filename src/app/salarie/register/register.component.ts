import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { Salarie } from './../../models/salarie.model';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  inscription = new FormControl('');
  emailRegex!: RegExp;
  passwordRegex!: RegExp;
  postaleRegex!: RegExp;
  villeRegex!: RegExp;
  adresseRegex!: RegExp;
  registerForm!: FormGroup;
  salarie = new Salarie()

  constructor(private formbuilder: FormBuilder,
              private router: Router,
              private dataService: DataService) { }

  ngOnInit(): void {
    this.emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/
    this.passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,20})/
    this.postaleRegex = /^[0-9]{5}/
    this.villeRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/
    this.adresseRegex = /^[a-zA-Z0-9\s,'-]|[\\u00C0\\u00C1\\u00C2\\u00C3\\u00C4\\u00C5\\u00C6\\u00C7\\u00C8\\u00C9\\u00CA\\u00CB\\u00CC\\u00CD\\u00CE\\u00CF\\u00D0\\u00D1\\u00D2\\u00D3\\u00D4\\u00D5\\u00D6\\u00D8\\u00D9\\u00DA\\u00DB\\u00DC\\u00DD\\u00DF\\u00E0\\u00E1\\u00E2\\u00E3\\u00E4\\u00E5\\u00E6\\u00E7\\u00E8\\u00E9\\u00EA\\u00EB\\u00EC\\u00ED\\u00EE\\u00EF\\u00F0\\u00F1\\u00F2\\u00F3\\u00F4\\u00F5\\u00F6\\u00F9\\u00FA\\u00FB\\u00FC\\u00FD\\u00FF\\u0153]*$/


    this.registerForm = this.formbuilder.group({
      civilite: [this.salarie.civilite, [Validators.required]],
      nom: [this.salarie.nom, [Validators.required, Validators.minLength(2)]],
      prenom: [this.salarie.prenom, [Validators.required, Validators.minLength(2)]],
      telephone: [this.salarie.telephone, [Validators.required,Validators.minLength(2)]],
      rue: [this.salarie.rue, [Validators.required, Validators.pattern(this.adresseRegex)]],
      cp: [this.salarie.cp, [,Validators.minLength(5),Validators.maxLength(5),Validators.pattern('[0-9]{5}')]],
      ville: [this.salarie.ville, [Validators.required, Validators.pattern(this.villeRegex), Validators.minLength(3)]],
      email: [this.salarie.email, [Validators.required, Validators.pattern(this.emailRegex)]],
      mdp: [this.salarie.mdp, [Validators.required, Validators.pattern(this.passwordRegex)]],
      // role: [this.salarie.role, [Validators.required, Validators.minLength(2)]],
      nomJeuneFille: [this.salarie.nom_jeune_fille],
      num_ss: [this.salarie.num_ss, [Validators.required, Validators.minLength(12)]],
      date_naissance: [this.salarie.date_naissance, Validators.required],
      lieu_naissance: [this.salarie.lieu_naissance, [Validators.required, Validators.minLength(4)]],
      pays_naissance: [this.salarie.pays_naissance, [Validators.required, Validators.minLength(4)]],

      // ConfirmPassword: ['', [Validators.required, Validators.pattern(this.passwordRegex)]],

    });
  }
  
  onSubmit() {
    const form = this.registerForm.value
    const Register = this.registerForm.value
    const motDePAsse = Register.mdp
    const confirmMotDePasse = Register.confirmMotDePasse

    this.salarie = Object.assign(this.salarie, form)

    this.dataService.registerSalarie(this.salarie).subscribe((result:Salarie)=>{
      
      console.log(result);
      localStorage.setItem('token', result.token)

      this.router.navigate(['salarie/overview'])
      
    })

  }

}
