import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController,  } from 'ionic-angular';
import { RequestDetailPage } from '../request-detail/request-detail';



@Component({
  selector: 'page-requests',
  templateUrl: 'requests.html',
})
export class RequestsPage {

  token: string
  unitys: any[] = [{name:'VIVAS - BR116'},{name: 'CIPETRAN - MARAPONGA'}]
  unity: string = "CIPETRAN - MARAPONGA";
  tasks: any[];
  constructor(private dataservice: DataserviceProvider, 
              private storage: Storage, 
              // private route: Router,
              private alert: AlertController,
              public loading: LoadingController,
              public navCtrl: NavController ) {
                this.storage.get('token')
    .then((val) => {
        this.token = val
        console.log('Home Token',this.token)
        this.getRequest(this.token)
    })
    
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestsPage');
    this.update(2,'CIPETRAN - MARAPONGA')
  }

  getRequest(token:string){
    const loader = this.loading.create({
      content: "Carregando..."
    });
    loader.present();
    this.dataservice.listUnitys(token)
    .then(data => {
      loader.dismiss()
      let parse: any = data
      this.unitys = parse;
      let res = parse.RDATA;
      // this.unitys = parse.RDATA
      this.getTasks(this.token,res[0].cod_unidade_atendimento)
      console.log('Unit: data',this.unitys)
      
    })
  }

  seg(event) {
    this.unity = event.detail.value;
  }

  update(id,name) {
    this.unity = name;
    console.log(this.unity)
    this.getTasks(this.token, id)
  }
  getTasks(token: string, id: any) {
    const loader = this.loading.create({
      content: "Carregando..."
    });
    loader.present();
    this.dataservice.listTasks(token,id)
    .then(data => {
      loader.dismiss()
      let parse: any = data
      this.tasks = parse.RDATA;
      console.log('Tasks', this.tasks)
    })
  }

  solicitar(cod: any){
    const loader = this.loading.create({
      content: "Carregando..."
    });
    loader.present()
    this.dataservice.saveRequest(this.token,cod)
    .then(data => {
      let parse: any = data
      console.log('Parse',parse)
      if(parse.RESULT == 'SUCESS'){
        loader.dismiss()
        this.navCtrl.push(RequestDetailPage,{cod: parse.COD})
      }else{
       this.presentAlert('Não foi possível cadastrar solicitação!')
       loader.dismiss()
      }
      
    })
    
  }

  async presentAlert(msg: string) {
    const alert = this.alert.create({
      cssClass: 'my-custom-class',
      title: 'Aviso',
      message: msg,
      buttons: ['OK']
    });

    alert.present();
  }


}
