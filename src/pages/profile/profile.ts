import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  token: string;
  user: any = {name: '', cpf: '', phone: '', email: '', prof: ''};
  person: string
  constructor(private service: DataserviceProvider,
              private storage: Storage,
              public loading: LoadingController,
              public navCtrl: NavController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.storage.get('token')
    .then((val) => {
        this.token = val
        console.log('Home Token',this.token)
        this.getUser(this.token)
    })
  }

  getUser(token: string){
    let lding = this.loading.create({
      cssClass: 'my-custom-class',
      content: 'Carregando...'
    })
    lding.present()
    this.service.getUser(token)
    .then(data => {
      let parse: any = data
      let usr = parse.RDATA;
      console.log('Parse Usuario',parse)
      this.user.cpf = usr['cpf_cnpj']
      this.user.email = usr['email']
      this.user.name = usr['nome']
      this.user.phone = usr['telefone']
      this.user.prof = usr['tipo_pessoa']
      if(this.user.prof == 'PF'){
        this.person = 'PF - Pessoa Física';
      }
      if(this.user.prof == 'PJ'){
        this.person = 'PJ - Pessoa Jurídica';
      }
      console.log('Usuario',this.user)

      lding.dismiss()
    })
  }

  updateUser(user: any){
    console.log('Update User:',user)
    let lding = this.loading.create({
      cssClass: 'my-custom-class',
      content: 'Carregando...'
    })
    lding.present()
    this.service.uptUser(user,this.token)
    .then(data => {
      lding.dismiss()
      let parse: any = data
      console.log('Att User',parse)
    })
  }

  logOut(){
    this.service.logOut(this.token)
    .then(data => {
      let parse: any = data
      console.log(parse)
      if(parse['RESULT'] == 'SUCESS'){
        this.storage.clear()
        this.navCtrl.setRoot(LoginPage)
      }
    })
  }


}
