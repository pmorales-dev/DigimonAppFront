import { Component, Input, ViewChild } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { OnInit } from '@angular/core';
import { DigimonService } from '../service/digimon.service';
import { Attribute, DigimonDetail, Field, Level, Type } from '../model/digimon.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: 'detail.page.html',
  standalone:true,
  imports:[IonicModule,CommonModule]
})
export class DetailPage implements OnInit{
  private unsubscribeAll:Subject<any>=new Subject<any>();
  public details:DigimonDetail|any;
  public attributes:Attribute|any;
  public types:Type|any;
  public fields:Field|any;
  public levels:Level|any;

  @Input() mySubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  constructor(private modalCtrl: ModalController,private digimonService:DigimonService) {}

  ngOnInit() {
    const preselect:number = this.mySubject.value;   
    this.digimonService.detailDigimon(preselect).pipe(takeUntil(this.unsubscribeAll)).subscribe((res:any)=>{
      this.details=res;
      this.fields=res.fields;
    })
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

 

}
