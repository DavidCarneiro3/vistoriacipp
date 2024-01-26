import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';
import { Storage } from '@ionic/storage';
import { InspectPage } from '../inspect/inspect';
import { DatePipe } from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-list-request',
  templateUrl: 'list-request.html',
})
export class ListRequestPage {
  listRequest: any
  token: any;
  lisSchedules: any
  user: any;
  name: string
  result: any;
  list: any;
  request = {unit: '', service: '', status: '', dt_ini: '', dt_fin: '', person: '', cod_user: ''}
  today = null
  time = Math.round((new Date()).getTime() / 1000);
  constructor(private storage: Storage, 
    private dataservice: DataserviceProvider,
    public loading: LoadingController,
    public alert: AlertController,
    public navParams: NavParams,
    public navCtrl: NavController) {
    // this.listRequest = this.navParams.get('request')
    console.log('Dados da Consulta',this.listRequest)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListRequestPage');
    this.storage.get('token')
    .then((val) => {
        this.token = val
        console.log('Request Inspect Token',this.token)
        
    })
  }
  
  getRequest() {
    const loader = this.loading.create({
      content: "Carregando..."
    });
    loader.present();
    const datepipe: DatePipe = new DatePipe('en-US')
    let dataini = datepipe.transform(this.listRequest.dt_ini, 'dd/MM/yyyy')
    let datafin = datepipe.transform(this.listRequest.dt_fin, 'dd/MM/yyyy')
    this.dataservice.listSchedules(this.token, dataini, datafin)
    .then(data => {
      let parse: any = data
      console.log('Agendamentos',parse.RDATA)
      this.lisSchedules = parse.RDATA
      loader.dismiss();
    })
  }

  opemInspect(cod_sol){
    this.navCtrl.push(InspectPage,{cod: cod_sol})
  }

  send(request){
    this.listRequest = request
    this.getRequest()
  }

  clear(){
    this.request.dt_fin = '';
    this.request.dt_ini = '';
    this.request.service= '';
    this.request.status = '';
    this.request.unit   = '';
  }

}
