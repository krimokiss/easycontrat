import { DataService } from 'src/app/services/data.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContratResolverResolver implements Resolve<any> {
constructor(private dataService : DataService){}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    console.warn('Je suis le resolver');
    
    return this.dataService.getAllSalarie();
  }
}
