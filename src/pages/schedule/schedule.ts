import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';
import { DatePipe } from '@angular/common';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

/**
 * Generated class for the SchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {
  request: any
  token: string
  requestData: any
  name: string
  dt_requ: string
  hr_req: string
  num_requ: number
  service: string
  place: string
  status_req: string
  serv_value: number
  cpf_cnpj: string
  placa: string
  dt_agendada: string
  constructor(
    // public route: Router,
              private storage: Storage, 
              private dataservice: DataserviceProvider,
              public loading: LoadingController,
              public alert: AlertController,
              public navCtrl: NavController,
              public navParams: NavParams) {
    this.request = this.navParams.get('cod');
    console.log('Request',this.request)
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');
    this.storage.get('token')
    .then((val) => {
        this.token = val
        console.log('Request Detail Token',this.token)
        this.getRequest(this.token,this.request)
    })
  }

  getRequest(token, cod){
    const loader = this.loading.create({
      content: "Carregando..."
    });
    loader.present();
    this.dataservice.listSavedRequest(token,cod)
    .then(data => {
      let parse:any = data
      this.requestData = parse.RDATA
      console.log('Parse',parse.RDATA)
      loader.dismiss()
      this.name = this.requestData['usu_nome']
      this.service = this.requestData['servico']
      this.num_requ = this.requestData['cod_solicitacao']
      this.place = this.requestData['nome_unidade']
      this.dt_requ = this.requestData['data_solicitacao']+' - '+this.requestData['hr_solicitacao']
      this.serv_value = this.requestData['vr_servico']
      this.status_req = this.requestData['status_solicitacao']
      this.cpf_cnpj = this.requestData['usu_cpf_cnpj']

    })
  }

  schedule(placa, cod_sol){
    const datepipe: DatePipe = new DatePipe('en-US')
    let dt_agen = datepipe.transform(this.dt_agendada, 'dd/MM/yyyy')
    this.dataservice.createSchedule(this.token, dt_agen, placa, cod_sol)
    .then(data => {
      let parse: any = data;
      console.log(parse)
      
      if(parse['RESULT'] == 'SUCESS'){
        this.presentAlert('Agendamento efetuado com sucesso! Acompanhe o status no menu Consulta Agendamento.')
        
            this.dataservice.createBoleto(placa, this.cpf_cnpj,this.token, this.name)
            .then(data => {
              let parseRes: any = data;
              let boletos: any = parseRes.RDATA
              console.log('Boleto criado', parseRes)
              this.dataservice.saveBoletoInfo(boletos['ano_referencia'], boletos['numero_referencia'], this.cpf_cnpj, this.token, cod_sol)
              .then(data => {
                let parsseBol: any = data
                console.log('Salvar dados boleto', parsseBol)
              })
            })
        this.navCtrl.setRoot(HomePage)
      }else{
        this.presentAlert('Não foi possível realizar o agendamento! Entre em contato conosco para mais informações.')
      }
    })
  }

  async presentAlert(msg: string) {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      title: 'Aviso',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

}
