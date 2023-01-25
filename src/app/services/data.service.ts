import { environment } from './../../environments/environment';
import { Contrat } from './../models/contrat.model';
import { Entreprise } from 'src/app/models/entreprise.model';
import { Salarie } from 'src/app/models/salarie.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  backend  = `${environment.API_URL}`
  apiEntreprise = 'https://recherche-entreprises.api.gouv.fr/'
 


  constructor(private _http : HttpClient,
              private router : Router) { }


              // TOKEN SIDE //

static getToken() {
  return localStorage.getItem('token')
}
static getRole(): boolean{
  const role:boolean = (localStorage.getItem('role') == 'true')
  return role
}

clearToken(): void {
  localStorage.removeItem('token')
  this.router.navigate((['/']))
}

getApiEntreprise(user:any): Observable<any> {
  return this._http.get<any>(this.apiEntreprise + "search?q=" + user + "&page=1&per_page=1")
}

              // SALARIE SERVICE SIDE //

registerSalarie(salarieForm: any): Observable<any> {
  return this._http.post(this.backend + "/salarie/register", salarieForm)
}
salarieLogin(salarie: Salarie) {
  return this._http.post<Salarie>(this.backend + "/salarie/login", salarie)
}
getAllSalarie():Observable<any> {
return this._http.get(this.backend + "/salarie/allUsers")
}
getSingleSalarie(id:any):Observable<any> {
  // console.warn('GET SINGLE SALARIE', id);
  return this._http.get(this.backend + "/salarie/user/"+ id)
}
getProfil(): Observable<any> {
return this._http.get(this.backend + "/salarie/profil")
}
updateSalarie(values:any, id: number): Observable<any> {
  return this._http.put<any>(this.backend + "/salarie/update/" + id, {formulaire: values})
}
deleteSalarie(id:any): Observable<any> {
  console.warn('From dataService ID : ', id);
  return this._http.delete(this.backend + "/salarie/delete/" +  id)
}


            // ENTREPRISE SERVICE SIDE //

registerEntreprise(entrepriseForm: any): Observable<any> {
  return this._http.post(this.backend + "/entreprise/register", entrepriseForm)
}
entrepriseLogin(entreprise: Entreprise) {
  return this._http.post<Entreprise>(this.backend + "/entreprise/login", entreprise)
}
getAllEntreprise():Observable<any> {
return this._http.get(this.backend + "/entreprise/allUsers")
}
getOneEntreprise(id:any): Observable<any>{
  return this._http.get(this.backend + "/entreprise/user/" + id)
}
getProfilEntreprise(): Observable<any> {
return this._http.get(this.backend + "/entreprise/profil")
}
updateEntreprise(values:any, id: number): Observable<any> {
  return this._http.put<any>(this.backend + "/entreprise/update/" + id, {formulaire: values})
}

            // CONTRAT SERVICE SIDE //

createContrat(contratForm:any): Observable<any> {
  return this._http.post(this.backend + '/contrat/contrat', contratForm)
}
getallContrat(): Observable<any> {
  return this._http.get(this.backend + '/contrat/allcontrat')
}
getMesContrats(): Observable<any> {
  return this._http.get(this.backend + '/contrat/mescontrats')
}
getOneContrat(id:any): Observable<any>{
  return this._http.get(this.backend + '/contrat/contrat/' + id)
}
deleteContrat(id: any): Observable<any> {  
  return this._http.delete(this.backend + '/contrat/delete/' + id)
}
getallContratByEnt(): Observable<any> {
  return this._http.get(this.backend + '/contrat/contratbyent')
}
getallContratBySalarie(): Observable<any> {
  return this._http.get(this.backend + '/contrat/contratbysalarie')
}
updateContrat(value:any, id: number): Observable<any> {
  return this._http.put<any>(this.backend + "/contrat/update/" + id, {formulaire: value})
}
}
