import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPage } from './list.page';
import { loginGuard } from 'src/app/login.guard';

const routes: Routes = [
  {
    path: '',
    component: ListPage,
    canActivate:[loginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListPageRoutingModule {}
