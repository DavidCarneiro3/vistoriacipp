import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';
import { ChangePassPage } from '../change-pass/change-pass';

/**
 * Generated class for the ForgetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {
  email: any;
  constructor(private dataservice: DataserviceProvider, 
    public alert: AlertController, 
    public loading: LoadingController, 
    public toast: ToastController,
    public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPasswordPage');
  }

  send(){
   
    let loader = this.loading.create({
      cssClass: 'my-custom-class',
      content: 'Carregando...'
    });
    loader.present()
    console.log('Usuario',this.email)
    //console.log('Senha',form.value.password)
    if(this.email != ''){
      console.log('Entrou no IF')
      this.dataservice.getRecoveryCode(this.email)
      .then(data => {
        let parse = data
        if(parse['RESULT'] == 'SUCESS'){
          //this.storage.clear();
          console.log('DATA',parse)
          console.log('Result',parse['RESULT'])
          //this.storage.set('token',parse['TOKEN'])
          this.navCtrl.setRoot(ChangePassPage,{email: this.email})
        }else{
          this.presentAlert('Erro!', parse['MSG_ERRO'])
        }
        console.log('Resultado',parse)
        
        
        loader.dismiss()
      })
    }
  }

  async presentAlert(title: string,msg: string) {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      title: title,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(msg: string) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
