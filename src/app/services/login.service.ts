import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public urlHttp = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  login(user: any): Observable<any> {
    return this.http.post(this.urlHttp+'/login', user);
  }

  logout(): Observable<any> {
    return this.http.get(this.urlHttp+'/logout');
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
  }
  
  getToken() {
    return localStorage.getItem("token");
  }

}
