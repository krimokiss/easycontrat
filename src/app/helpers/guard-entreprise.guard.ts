import { DataService } from 'src/app/services/data.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class GuardEntrepriseGuard implements CanActivate {
  constructor(private router: Router,
    private dataService: DataService,
    private snackBar: MatSnackBar) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const role = DataService.getRole();
      // console.log(role);
      
      if (role) {
        return true;
      } else {
        this.snackBar.open('Vous devez être authentifier pour accéder à cette page!', 'ok', { verticalPosition: 'top' })
        return this.router.navigate(['/'])
      }
  
    }
  
}
