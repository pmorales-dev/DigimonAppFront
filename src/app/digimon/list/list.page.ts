import { Component } from '@angular/core';
import { DigimonService } from '../service/digimon.service';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { OnInit } from '@angular/core';
import { Digimon, paginationDigimon } from '../model/paginationDigimon.type';
import {MatDialog} from '@angular/material/dialog';
import { DetailPage } from '../detail/detail.page';
import { Route,Router,Routes } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html'
})

export class ListPage implements OnInit {
  private unsubscribeAll:Subject<any>=new Subject<any>();
  public digimonList:Digimon | any;
  public paginationInfo:any;
  public paginationDigimon:paginationDigimon | any;
  changes = new Subject<void>();
  p:number=0;
  public digimonList$: Observable<any[]>;

  constructor(
    private digimonS:DigimonService,
    public dialog: MatDialog,
    private router:Router,
    private modalCtrl: ModalController
  ) {
    this.digimonList$ = this.digimonS.digimons$;
  }

  ngOnInit():void{
    this.getDigimons(0);
  }

  getDigimons(page:number){
    this.digimonS.listDigimons(page).pipe(takeUntil(this.unsubscribeAll)).subscribe((res:any)=>{
      if(res){
        this.digimonList=res.content;
        this.paginationInfo=res.pageable;  
      }
      })
  }

  onPageChange(page: number) {
    this.getDigimons(page-1);
  }

  async showDetailsDigimon(idUrl:number) {
    const mySubject = new BehaviorSubject(idUrl);

    const modal = await this.modalCtrl.create({
      component: DetailPage,
      componentProps: {
        mySubject
      }
    });
    await modal.present();
  }

}
