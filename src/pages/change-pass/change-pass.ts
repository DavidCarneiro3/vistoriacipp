import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';
import { ForgetPasswordPage } from '../forget-password/forget-password';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ChangePassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-change-pass',
  templateUrl: 'change-pass.html',
})
export class ChangePassPage {
  email: string
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private dataservice: DataserviceProvider, 
    public alert: AlertController, 
    public loading: LoadingController, 
    public toast: ToastController) {
      this.email = this.navParams.get('email')

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePassPage');
  }
  send(form){
   console.log('FORM',form.value);
    let loader = this.loading.create({
      cssClass: 'my-custom-class',
      content: 'Carregando...'
    });
    loader.present()
    console.log('Usuario',form.value.senha)
    //console.log('Senha',form.value.password)
    if(form.value.senha != '' && form.value.cod){
      console.log('Entrou no IF')
      this.dataservice.changePass(this.email, form.value.cod, form.value.password)
      .then(data => {
        let parse = data
        if(parse['RESULT'] == 'SUCESS'){
          //this.storage.clear();
          console.log('DATA',parse)
          console.log('Result',parse['RESULT'])
          this.presentAlert('Sucesso!', 'Senha alterada com sucesso')
          this.navCtrl.setRoot(LoginPage)
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

  back(){
    this.navCtrl.setRoot(ForgetPasswordPage);
  }

}
