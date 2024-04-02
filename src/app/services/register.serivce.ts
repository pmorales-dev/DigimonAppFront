import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  public urlHttp = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  register(user: any): Observable<any> {
    return this.http.post(this.urlHttp+'/store', user);
  }

}
