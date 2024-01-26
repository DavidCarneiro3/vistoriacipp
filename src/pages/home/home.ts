import { Component } from '@angular/core';
// import { Router } from '@angular/router';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';
import { DatePipe } from '@angular/common';
import { Storage } from '@ionic/storage';

import * as sha512 from 'js-sha512';
import { InspectPage } from '../inspect/inspect';
import { ListRequestPage } from '../list-request/list-request';
import { LoginPage } from '../login/login';

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


  getUser(token: string){
    const loader = this.loading.create({
      content: "Carregando..."
    });
    loader.present()
    this.service.getUser(token)
    .then(data => {
      loader.dismiss()
      let parse: any = data
      this.user = parse.RDATA
      console.log('Usuario',this.user)
      this.name = this.user['nome'];
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
    console.log('Dados Solicitação',cod)
    this.navCtrl.push(InspectPage,{cod: cod})
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
