import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { HTTP } from '@ionic-native/http';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { FileOpener } from '@ionic-native/file-opener';
import { InAppBrowser } from '@ionic-native/in-app-browser';



@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {
  request: any
  token: string
  requestData: any
  name: string
  dt_requ: string
  hr_req: string
  num_requ: number
  place: string
  status_req: string
  serv_value: number
  cpf_cnpj: string
  placa: string
  dt_agendada: string
  dados_vist: any
  result: any
  sequencial: any
  ano_vis: any
  fileTransfer: any
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private storage: Storage,
              private service: DataserviceProvider,
              public loading: LoadingController,
              private file: File,
              private _platform: Platform,
              private httpClient: HTTP,
              private ft: FileTransfer,
              private document: DocumentViewer,
              private fileOpener: FileOpener,
              private iab: InAppBrowser) {

                console.log('Plataforma',this._platform.platforms())
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
    this.dados_vist = this.navParams.get('vis_data')
    this.request = this.navParams.get('cod')
    console.log('Dados envio Vistoria',this.dados_vist)
    this.sequencial = this.dados_vist['num_seq']
    this.ano_vis = this.dados_vist['ano_ref']
    this.storage.get('token')
    .then((val) => {
        this.token = val
        console.log('Home Token',this.token)
        this.getRequest(this.token,this.request)
        this.getReport(this.sequencial,this.ano_vis)
        this.getReportPdf(this.sequencial,this.ano_vis)
        //this.download()

    })
  }

  getReport(seq,ano_ref){
    const loader = this.loading.create({
      content: "Carregando..."
    });
    loader.present();
    this.service.getReport(seq,ano_ref,this.token)
    .then(data => {
      this.result = data
      loader.dismiss()
      console.log('Laudo',this.result)
    })
  }

  getRequest(token, cod){
    const loader = this.loading.create({
      content: "Carregando..."
    });
    loader.present();
    this.service.listSavedRequest(token,cod)
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

  

  getReportPdf(seq,ano_ref){
   
    this.service.getReportPdf(seq,ano_ref,this.token)
    .then(data => {
      this.result = data
      console.log('PDF',this.result)
    })
  }

  download() {
    // const fileTransfer = this.transfer.create();
    // let path = null;
    // if(this._platform.is('ios')){
    //   path = this.file.documentsDirectory;
    // }else{
    //   path = this.file.dataDirectory
    // }
    // const url = 'https://vivasagendamento1.websiteseguro.com/pdf/'+this.sequencial+'.pdf';
    // fileTransfer.download(url, path + 'laudo.pdf').then((entry) => {
    //   const options: DocumentViewerOptions = {
    //     title: 'My PDF'
    //   }
    //   let urlPdf = entry.toURL()
    //   this.document.viewDocument(urlPdf, 'application/pdf', {});
    //   console.log('download complete: ' + url);
    // }, (error) => {
    //   // handle error
    //   console.log('Erro: '+error)
    // });
  //if(this._platform.is('android') || this._platform.is('ios')){
    let downloadUrl = 'https://vivasagendamento1.websiteseguro.com/pdf/'+this.sequencial+'.pdf';
  let path = this.file.dataDirectory;
  const transfer = this.ft.create();
  transfer.download(downloadUrl, path + 'laudo.pdf').then(entry => {


    let url = entry.toURL();

    if (this._platform.is('ios')) {
      this.document.viewDocument(url, 'application/pdf', {});

    } else {
      // if(this._platform.is('android')){
        this.fileOpener.open(url, 'application/pdf')

        .then(() => console.log('File is opened'))
        .catch(e => console.log('Error opening file', e));
      // }else{
      //   let url = encodeURIComponent('https://vivasagendamento1.websiteseguro.com/pdf/'+this.sequencial+'.pdf');
      //   this.iab.create('https://docs.google.com/viewer?url='+url)
      // }
      


    }
  });
  // }else{
  //   let url = encodeURIComponent('https://vivasagendamento1.websiteseguro.com/pdf/'+this.sequencial+'.pdf');
  //       this.iab.create('https://docs.google.com/viewer?url='+url)
  // }

  
  }
    
}
