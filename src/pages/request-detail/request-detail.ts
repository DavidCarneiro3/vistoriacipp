import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { PagarmeProvider } from '../../providers/pagarme/pagarme'
import { SchedulePage } from '../schedule/schedule';
import { HomePage } from '../home/home';
import { CieloProvider } from '../../providers/cielo/cielo';
import { environment } from '../../environments/environment';
import { Constants } from '../../environments/constants';
//  let dataOp: {
//   MerchantOrderId: number;
//   Customer: {
//       Name: string;
//   };
//   Payment: {
//       Type: string;
//       Amount: number;
//       Installments: number;
//       DebitCard: {};
//       CreditCard: {};
//       Provider: string;
//   };
// }

@Component({
  selector: 'page-request-detail',
  templateUrl: 'request-detail.html',
})
export class RequestDetailPage {
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
  dataOp = {MerchantOrderId: 0,Customer:{name:''}, Payment:{Type:'',Amount:0,Installments:0,DebitCard:{},CreditCard:{}}}
  card = {num: '', mes: '', ano: '', cvv: '', tit: ''}
  adress = {uf: '', cidade: '', bairro: '', endereco: '', numero: 0, complemento: '', cep: ''}
  card_hash: any;
  payMethod: string = 'credit';
  //dataOp: any
  
  constructor(
    // public route: Router,
              private storage: Storage, 
              private dataservice: DataserviceProvider,
              public loading: LoadingController,
              public alert: AlertController,
              private pagarme: PagarmeProvider,
              public navParams: NavParams,
              public navCtrl: NavController,
              private cieloProvider: CieloProvider,
              private alertCtrl: AlertController) {
    this.request = this.navParams.get('cod');
    console.log('Request',this.request)
    this.storage.get('token')
    .then((val) => {
        this.token = val
        console.log('Request Detail Token',this.token)
        this.getRequest(this.token,this.request)
    })
   }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestDetailPage');
    
  }

  cardHash(card){
    this.pagarme.getCardHash(card)
    .then(data => {
      console.log('Card Hash',data)
      if(data != ''){
        this.card_hash = data;
      }else{
        this.presentAlert('Não foi possível recuperar os dados do seu cartão, tente novamente mais tarde, ou escolha outro cartão.')
      }
      
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
      this.dt_requ = this.requestData['data_solicitacao']
      this.serv_value = this.requestData['vr_servico']
      this.status_req = this.requestData['status_solicitacao']
    })
  }

  checkout(adress,cod_sol){
    console.log('Adress',adress)
    this.adress.cep = adress.cep.replace('.','');
    this.adress.cep = adress.cep.replace('-','');
    console.log('New Adress',adress)
    console.log('Cod_Sol',cod_sol)
    console.log('Name',this.name)
    const loader = this.loading.create({
      content: "Carregando..."
    });
    loader.present()
    if (environment.cielo) {
      this.dataOp.Customer.name= this.name;
      this.dataOp.Payment.Amount = this.serv_value;
      this.dataOp.MerchantOrderId = this.request
      this.cieloProvider.resolver(this.payMethod, this.dataOp, this.card)
          .then(data => {

              if (data.Payment.Status === 1) {
                  console.log(data);
                  
                  this.navCtrl.setRoot(HomePage)

                  loader.dismiss();
                  // OK --- GOOD
              } else {
                  let status = environment.production ? Constants.CieloProductionCodes[data.Payment.ReturnCode] : Constants.CieloSandboxCodes[data.Payment.ReturnCode]
                  this.showAlert('Ops', status, 'error', () => {
                      loader.dismiss();
                  })
              }
              // alert(data);

          }).catch(error => {
              this.showAlert('Ops!', JSON.stringify(error), 'error', () => {
                  loader.dismiss();
              })
          });

  } else {
    this.pagarme.getCardHash(this.card)
    .then(data => {
      console.log('Card Hash',data)
      
      if(data != ''){
        this.card_hash = data;
        this.dataservice.payment(this.card_hash,adress,this.token,cod_sol,this.name, this.request)
        .then(data =>{
          let parse: any = data
          console.log('Checkout',parse)
          if(parse['RESULT'] == 'SUCESS'){
            let data: any = parse.RDATA;
            loader.dismiss()
            this.presentAlert('Pagamento efetuado com sucesso!')
            this.navCtrl.push(SchedulePage,{cod: this.request})
          }else{
            this.presentAlert(parse['MSG_ERRO'])
            loader.dismiss()
          }
        })
      }else{
        loader.dismiss()
        this.presentAlert('Não foi possível recuperar os dados do seu cartão, tente novamente mais tarde, ou escolha outro cartão.')
        
      }
      
    })
  }
    
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

 findCep(cep: string){
   console.log('CEP',cep)
   let cept = cep.replace('.','')
   cept = cept.replace('-','')
   console.log('CEPT',cept)
   this.dataservice.findByCep(cept)
   .subscribe(response => {
     let dados: any = response
     this.adress.bairro = dados.bairro
     this.adress.endereco = dados.logradouro
     this.adress.uf = dados.uf
     this.adress.cidade = dados.localidade
   })
 }

 private showAlert(title: string, msg: string, type: string, callback) {
  let alert = this.alertCtrl.create({
      title: title,
      message: msg,
      cssClass: type,
      buttons: [
          {
              text: 'OK',
              cssClass: 'btn-ok',
              handler: data => {
                  callback();
              }
          }
      ]
  });
  alert.present();
}


}
