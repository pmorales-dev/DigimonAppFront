import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Digimon,paginationDigimon } from '../model/paginationDigimon.type';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DigimonDetail } from '../model/digimon.type';


@Injectable({
  providedIn: 'root'
})

export class DigimonService {

  private urlHttp = 'https://digi-api.com/api/v1/digimon';

  private _digimon: BehaviorSubject<Digimon[]> = new BehaviorSubject<Digimon[]>([]);
  private _digimonDetail:BehaviorSubject<DigimonDetail[]>=new BehaviorSubject<DigimonDetail[]>([]);
  constructor(private http:HttpClient) {}

  get digimons$() : Observable<Digimon[]> {
    return this._digimon.asObservable();
  }

  listDigimons(page:number=0):Observable<paginationDigimon>{
    const url = `https://digi-api.com/api/v1/digimon?page=${page}&pageSize=10`;

    return this.http.get<paginationDigimon>(url,{
    }).pipe(tap(res=>{
      this._digimon.next(res.content);
    }))
  }

  detailDigimon(id:number):Observable<DigimonDetail>{
    const apiDetailDigimon = 'https://digi-api.com/api/v1/digimon/'+id;
    return this.http.get<DigimonDetail>(apiDetailDigimon);
  }

}
