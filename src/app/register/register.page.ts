import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { RegisterService } from '../services/register.serivce';
import { ModalService } from '../services/modal.service';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html'
})
export class RegisterPage implements OnInit {
  formRegister: FormGroup;

  constructor(public formB: FormBuilder, 
    private modalService:ModalService,
    private modalCtrl: ModalController,
    public registerService:RegisterService,
    private alertController: AlertController) {
    this.formRegister = this.formB.group({
      'newName': new FormControl("",Validators.required),
      'newPassword': new FormControl("",Validators.required),
      'newEmail':new FormControl("",Validators.required)
    });
  }

  ngOnInit(): void {
    this.modalService.clearRegisterForm$.subscribe(() => {
      this.clearForm();
    })
  }

  registerUser():void{
    const user = {
      name: this.formRegister.get('newName')?.value,
      password: this.formRegister.get('newPassword')?.value,
      email: this.formRegister.get('newEmail')?.value
    }
    this.registerService.register(user).subscribe((res:any)=>{
      this.cancel();
      this.clearForm();
      this.presentAlert();
     },(Error:any)=>{
      alert(Error.error.message)
     });
  }

  clearForm(){
    this.formRegister.reset();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Usuario Creado',
      message: 'Usuario Creado Satisfactoriamente',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }


  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }


}
