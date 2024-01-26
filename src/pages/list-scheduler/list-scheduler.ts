import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';
import { Storage } from '@ionic/storage';
import { ReportPage } from '../report/report';

/**
 * Generated class for the ListSchedulerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-list-scheduler',
  templateUrl: 'list-scheduler.html',
})
export class ListSchedulerPage {
  dt_ini: string
  dt_fin: string
  list: any;
  token: string;

  constructor(private dataservice: DataserviceProvider,
    private storage: Storage,
    public loading: LoadingController,
    public navCtrl: NavController) { }

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
    this.dataservice.listSchedules(this.token,dataini,datafin)
    .then(data => {
      let parse: any = data
      console.log('Lista de solicitações',parse)
      this.list = parse.RDATA
      loader.dismiss()
    })
  }

  opemReport(cod_sol){
    const loader = this.loading.create({
      content: "Carregando..."
    });
    loader.present();
    this.dataservice.getReportRef(cod_sol, this.token)
    .then(data => {
      let parse: any = data
      console.log('Dados Referencia',parse)
      loader.dismiss()
      this.navCtrl.push(ReportPage,{vis_data: parse, cod: cod_sol})
    })
  }

}
