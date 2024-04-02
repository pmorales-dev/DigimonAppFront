import { ActivatedRouteSnapshot, ActivationEnd, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable, inject } from '@angular/core';

export const loginGuard:CanActivateFn = (route,state)=>{
  const authService=inject(AuthService);
  console.log(authService.isAuthenticated());
  return authService.isAuthenticated();
}
