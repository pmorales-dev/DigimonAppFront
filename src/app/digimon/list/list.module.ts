import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListPage } from './list.page';
import { ListPageRoutingModule } from './list-routing.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MatPaginatorModule,
    NgxPaginationModule,
    ListPageRoutingModule
  ],
  declarations: [ListPage]
})
export class ListPageModule {}
