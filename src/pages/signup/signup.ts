import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  submitAttempt: boolean = false;
  public signupForm: FormGroup;
  token: string;
  user: any = {name: '', cpf: '', phone: '', email: '', prof: '', usuario: '',senha: '', confirmar: ''};
  person: string
  radio: any
  constructor(private service: DataserviceProvider,
              private storage: Storage,
              public loading: LoadingController,
              private navCtrl: NavController,
              public formBuilder: FormBuilder,
              public alert: AlertController) { 

                const emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

            this.signupForm = formBuilder.group({
                name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(12)])],
                phone: ['', [Validators.required, Validators.minLength(11)]],
                cpf: ['', [Validators.required, Validators.minLength(14)]],
                email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
                senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
                confirmar: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
                usuario: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(12)])],
                prof: ['', Validators.compose([Validators.required])]
            });
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  sigup(){
    this.user.name = this.signupForm.value.name
    this.user.phone = this.signupForm.value.phone
    this.user.cpf = this.signupForm.value.cpf
    this.user.email = this.signupForm.value.email
    this.user.senha = this.signupForm.value.senha
    this.user.usuario = this.signupForm.value.usuario
    this.user.prof = this.signupForm.value.prof
    console.log('Update User:',this.user)
    let lding = this.loading.create({
      cssClass: 'my-custom-class',
      content: 'Carregando...'
    })
    lding.present()
    this.service.signup(this.user,this.token)
    .then(data => {
      lding.dismiss()
      let parse: any = data
      console.log('Att User',parse)
      if(parse.RESULT == 'SUCESS'){
        this.navCtrl.setRoot(LoginPage)
      }else{
        this.presentAlert('Não foi possível realizar o cadastro, verifique os campos e tente novamente.')
      }
    })
  }

  focusInput(input) {
    input.setFocus();
}
async presentAlert(msg: string) {
  const alert = await this.alert.create({
    cssClass: 'my-custom-class',
    title: 'Aviso',
    message: msg,
    buttons: ['OK']
  });

  await alert.present();
}

}
