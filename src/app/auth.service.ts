import { Injectable } from '@angular/core';
import { Route, Router, Routes } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public router:Router) { }

  isAuthenticated(): Observable<boolean> {
    const authToken = localStorage.getItem('token'); 
    const isAuthenticated = authToken !== null;
    if(!isAuthenticated){
        this.router.navigate(['/login']);
    }
    return of(isAuthenticated);
  }
}
