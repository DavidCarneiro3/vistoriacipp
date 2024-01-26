import { Component, OnInit } from '@angular/core';
import { IonicPage, AlertController, LoadingController, NavController, Platform, ToastController, Tabs } from 'ionic-angular';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(private dataservice: DataserviceProvider, 
    public alert: AlertController, 
    public loading: LoadingController, 
    public toast: ToastController,
    private storage: Storage,
    private platform: Platform,
    public navCtrl: NavController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login(form){
    let plat = this.platform.platforms()
    console.log('Plataforma',plat[1])
    let loader = this.loading.create({
      cssClass: 'my-custom-class',
      content: 'Carregando...'
    });
    loader.present()
    console.log('Usuario',form.value.user)
    //console.log('Senha',form.value.password)
    if(form.user != '' && form.password != ''){
      console.log('Entrou no IF')
      this.dataservice.login(form.value.user,form.value.password)
      .then(data => {
        let parse = data
        console.log('Data', parse)
        if(parse['RESULT'] == 'SUCESS'){
          this.storage.clear();
          console.log('TOKEN', parse['TOKEN'])
          console.log('RDATA',parse['RDATA'])
          console.log('Result',parse['RESULT'])
          console.log('Token',parse['TOKEN'])
          this.storage.set('token',parse['TOKEN'])
          this.navCtrl.setRoot(HomePage, {token: parse['TOKEN']})
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

  goHome(){
    this.navCtrl.setRoot(HomePage);
  }


}
