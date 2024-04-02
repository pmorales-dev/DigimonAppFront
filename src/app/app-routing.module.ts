import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { loginGuard } from './login.guard';
import { RegisterPageModule } from './register/register.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path:'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
  },
  {
    path:'register',
    loadChildren:()=>import('./register/register.module').then(m=>RegisterPageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./digimon/list/list.module').then( m => m.ListPageModule),
    canActivate:[loginGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
