
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { RequestDetailPage } from '../request-detail/request-detail';
import { SchedulePage } from '../schedule/schedule';



@Component({
  selector: 'page-list-request',
  templateUrl: 'list-request.html',
})
export class ListRequestPage {

  dt_ini: string
  dt_fin: string
  list: any;
  token: string;
  disabledPayment: boolean = false;
  disabledCancel: boolean = false;
  constructor(private dataservice: DataserviceProvider, 
    private storage: Storage, 
    // private route: Router,
    private alert: AlertController,
    public loading: LoadingController,
    public navCtrl: NavController ) {

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListRequestPage');
    this.storage.get('token')
    .then((val) => {
        this.token = val
        console.log('Request Detail Token',this.token)
    })
  }

  getListRequests(dt_ini,dt_fin){
    const loader = this.loading.create({
      content: "Carregando..."
    });
    loader.present();
    const datepipe: DatePipe = new DatePipe('en-US')
    let dataini = datepipe.transform(dt_ini, 'dd/MM/yyyy')
    let datafin = datepipe.transform(dt_fin, 'dd/MM/yyyy')
    this.dataservice.listRequests(this.token,dataini,datafin)
    .then(data => {
      let parse: any = data
    
      console.log('Lista de solicitações',parse)
      this.list = parse.RDATA
      loader.dismiss()
    })
  }

  goPayment(cod_sol){
    this.navCtrl.push(RequestDetailPage,{cod: cod_sol})
  }

  goSchedule(cod_sol){
    this.navCtrl.push(SchedulePage,{cod: cod_sol})
  }

  cancelSol(cod_sol){
    const loader = this.loading.create({
      content: "Carregando..."
    });
    loader.present();
    this.dataservice.cancelSolicitacao(cod_sol, this.token)
    .then(data => {
      let parse: any = data
      console.log('Res Cancel',parse)
      this.getListRequests(this.dt_ini,this.dt_fin)
      loader.dismiss()
    })
  }

}
