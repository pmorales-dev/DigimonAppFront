/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { BehaviorSubject, async } from 'rxjs';
import { RegisterPage } from '../register/register.page';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit,OnDestroy {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder,
    private modalCtrl: ModalController,
    public router:Router,private alertController: AlertController,private loginService:LoginService) { 

    if(localStorage.getItem('token')){
      this.router.navigate(['/list']);
    }
    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required)
    })

  }
  ngOnDestroy(): void {
    localStorage.removeItem('token');
  }

  ngOnInit():void {
    //not empty
  }

  gotoList(){
    const user = {
      email:this.formularioLogin.get('nombre')?.value,
      password:this.formularioLogin.get('password')?.value
    }
    this.loginService.login(user).subscribe((res:any)=>{
      if(res){
        if(res.message=='Invalid Credentials'){
          alert('Credenciales no coinciden con nuestros registros ')
        }else{
          this.loginService.setToken(res.access_token);
          this.router.navigate(['/list']);
        }
      }    },(Error:any)=>{
        this.presentAlert(Error.error.message);
      });
  }

  async presentAlert(error:any) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: error
    });

    await alert.present();
  }

    async gotoRegister() {
      const modal = await this.modalCtrl.create({
        component: RegisterPage
      });
      modal.onDidDismiss().then((data) => {
        console.log(data);
        // Este código se ejecutará cuando el modal se cierre
        if (data && data.role === 'registered') {
          this.cancel();
        }
      });
      await modal.present();
    }

    cancel() {
      return this.modalCtrl.dismiss(null, 'cancel');
    }

}
