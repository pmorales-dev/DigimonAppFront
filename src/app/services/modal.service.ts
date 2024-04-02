import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private clearRegisterFormSource = new BehaviorSubject<boolean>(false);
  clearRegisterForm$ = this.clearRegisterFormSource.asObservable();

  constructor() { }

  clearRegisterForm() {
    this.clearRegisterFormSource.next(true);
  }
}