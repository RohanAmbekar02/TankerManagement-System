import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = localStorage.getItem('user');
    if (user) {
      return true; // Token ya user mila to access allowed
    } else {
      this.router.navigate(['/login']); // Nahi mila to redirect
      return false;
    }
  }
}
