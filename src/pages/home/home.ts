import { Component } from '@angular/core';
// import { Router } from '@angular/router';
import { IonicPage, LoadingController, NavController } from 'ionic-angular';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';
import { Storage } from '@ionic/storage';
import { RequestsPage } from '../requests/requests';
import { ListRequestPage } from '../list-request/list-request';
import { ProfilePage } from '../profile/profile';
import { ListSchedulerPage } from '../list-scheduler/list-scheduler';

import * as sha512 from 'js-sha512';
var request = require('request');


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  user: any;
  token:string
  name: string
  result: any;
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

  constructor(
              // private route: Router,
              private service: DataserviceProvider,
              public loading: LoadingController,
              private storage: Storage,
              public navCtrl: NavController) {
                
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.storage.get('token')
    .then(val => {
        this.token = val
        console.log('Home Token in Home',this.token)
        this.getSession(this.token)
        this.getUser(this.token)
        //this.getBoletosEtf()
        this.getReqEtf()
       
    })
  }

  openRequests(){
    this.navCtrl.push(RequestsPage)
  }

  openListRequests(){
    this.navCtrl.push(ListRequestPage)
  }

  openProfile(){
    this.navCtrl.push(ProfilePage)
  }

  openScheduling(){
    this.navCtrl.push(ListSchedulerPage)
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
      this.name = this.user['nome'];
      console.log('Usuario',this.user)
      
    })
  }

  getSession(token: string){
    this.service.getSession(token)
    .then(data => {
      let parse: any = data
      console.log('Sessão',parse)
    })
  }

  //  getBoletosEtf(){
  //    let ano_referencia = '2021';
  //    let numero_referencia = '7094';
  //    let cpf = '02575638062'
  //     this.service.saveBoletoInfo(ano_referencia, numero_referencia, cpf, this.token)
  //   .then(data => {
  //     let parsseBol: any = data
  //     console.log('Salvar dados boleto', parsseBol)
  //   })
  //  }

  getReqEtf(){
    // var request = require('request');
    // var options = {
    //   'method': 'GET',
    //   'url': 'https://apietuforweb.fortaleza.ce.gov.br/etu/lacus-web/placa/PMI8927/cpf/02575638062/boletos',
    //   'headers': {
    //     'ApiKey': this.ApiKey,
    //     'Hash': this.hash,
    //     'Nonce': this.time,
    //     'Timestamp': this.time,
    //     'Cookie': 'TS01394ec8=014de840e04d0864f3b9c9652ca950f02467309c696711134cb3418eacb9bd6cd99069b348d0fb2531b166ca86f1649cf8345eb63d'
    //   }
    // };
    // request(options, function (error, response) {
    //   if (error) throw new Error(error);
    //   console.log('Etufor',response.body);
    // });

    // let date = new Date('2021-01-02')
    // console.log('Data: ',date.getTime())

  }

  getBoleto(){
    let ref: number = 4115;
    let anoRef: number = 2021;
    this.service.getBolInfo(ref, anoRef)
    .then(data => {
      let parse: any = data
      console.log('Dados do Boleto',parse)
    })
  }

}
