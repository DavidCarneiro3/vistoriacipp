import { Component } from '@angular/core';
// import { Router } from '@angular/router';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';
import { DatePipe } from '@angular/common';
import { Storage } from '@ionic/storage';

import * as sha512 from 'js-sha512';
import { InspectPage } from '../inspect/inspect';
import { ListRequestPage } from '../list-request/list-request';
import { LoginPage } from '../login/login';
import { ControlPage } from '../control/control';
import { InfoPage } from '../info/info';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  ordemServico: any = "";
  user: any;
  token:string
  name: string
  result: any;
  list: any;
  request = {unit: '', service: '', status: '', dt_ini: '', dt_fin: '', person: '', cod_user: ''}
  today = null
  time = Math.round((new Date()).getTime() / 1000);
  ApiKey = "eShVmYq3t6w9z$C&F)H@McQfTjWnZr4u7x!A%D*G-KaNdRgUkXp2s5v8y/B?E(H+"
  //hash = time+time+ApiKey;
  
  SecretKey = "D*G-KaNdRgUkXp2s5v8y/B?E(H+MbQeShVmYq3t6w9z$C&F)J@NcRfUjWnZr4u7x";
  hash = sha512.sha512(this.SecretKey+'.'+this.time+'.'+this.time);
  headers = {
    'ApiKey': this.ApiKey,
    'Hash': this.hash,
    'Nonce': this.time,
    'Timestamp': this.time,
    'Cookie': 'TS01394ec8=014de840e02b7513cecdf26aeb805e17dd8944a63f58acadd3c64655a803c0ef25f27e908250df35ca3a793713e7c3c260eea8a77b'
};
  options = {
    url: 'https://apietuforweb.fortaleza.ce.gov.br/etu/lacus-web/placa/PMI8927/cpf/02575638062/boletos',
    headers: this.headers
};
  serv: any;

  constructor(
              // private route: Router,
              private service: DataserviceProvider,
              public loading: LoadingController,
              private storage: Storage,
              public alert: AlertController,
              public navCtrl: NavController,
              public navParams: NavParams) {
                
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    // this.token = this.navParams.get('token')
    // console.log('Token',this.token)
    this.storage.get('token')
    .then((val) => {
      console.log('Val',val)
        this.token = val
        console.log('Token in Home',this.token)
        this.getUser(this.token)
        // this.teste()
       
    })
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


  getUser(token: string){
    const loader = this.loading.create({
      content: "Carregando..."
    });
    loader.present()
    this.service.getUser(token)
    .then((data: any) => {
      let parse: any = data
      if(data.RESULT == "SUCESS"){
        loader.dismiss()
        
        this.user = parse.RDATA
        console.log('Usuario',this.user)
        this.name = this.user['nome'];
      }else{
        this.presentAlert('Erro!', parse.MSG_ERRO);
        this.storage.clear();
        loader.dismiss()
        this.navCtrl.setRoot(LoginPage);
      }
    },
    err => {
      console.log("Erro", err)
      loader.dismiss();
    })
  }

  opemInspect(cod_sol){
    this.navCtrl.push(InspectPage,{cod: cod_sol})
  }

  getSession(token: string){
    this.service.getSession(token)
    .then(data => {
      let parse: any = data
      console.log('Sessão',parse)
    })
  }

  getListUnit(){
    const loader = this.loading.create({
      content: "Carregando..."
    });
    loader.present();
    // const datepipe: DatePipe = new DatePipe('en-US')
    // let dataini = datepipe.transform(dt_ini, 'dd/MM/yyyy')
    // let datafin = datepipe.transform(dt_fin, 'dd/MM/yyyy')
    this.service.listUnitys(this.token)
    .then(data => {
      let parse: any = data
      console.log('Lista de Unidades',parse)
      this.list = parse.RDATA
      loader.dismiss()
    })
  }

  onChange(opt){
    console.log(opt);
    this.service.listTasks(this.token,opt.cod_unidade_atendimento)
    .then(data => {
      let parse: any = data
      this.serv = parse.RDATA;
      console.log('Cidades',this.serv)
    })
  }

  send(cod){
    // this.request.person = this.user['tipo_pessoa']
    // this.request.cod_user = this.user['cod_sys_usuario']
    // console.log('Dados Solicitação',cod)
    // this.navCtrl.push(ControlPage,{cod: cod})

    this.service.searchReport(cod, this.token)
    .subscribe((data: any) => {
      console.log('Resposta Laudo',data);
      if(data.RESULT == "ERROR"){
        this.navCtrl.push(InspectPage,{cod: cod})
      }
      if(data.RESULT == "INFO"){
        this.navCtrl.push(InfoPage,{cod: cod})
      }
      if(data.RESULT != "ERROR" && data.RESULT != "INFO"){
        this.navCtrl.push(ControlPage,{cod: cod})
      }
    }, err => {
      console.log("Erro Resposta Laudo", err);
      this.navCtrl.push(ControlPage,{cod: cod})
    })
  }


  clear(){
    this.request.dt_fin = '';
    this.request.dt_ini = '';
    this.request.service= '';
    this.request.status = '';
    this.request.unit   = '';
    this.logOut()
  }

  logOut(){
    this.service.logOut(this.token)
    .then(res => {
      console.log("logout res", res)
      this.storage.clear();
      this.navCtrl.setRoot(LoginPage)
    },
    error => {
      console.log("error logout", error)
      this.navCtrl.setRoot(LoginPage)
    })
  }

  // teste(){
  //   this.service.createInspect(this.token)
  //   .then(data => {
  //     console.log('Teste Inspecao',data)
  //   })
  // }

}
