import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Generated class for the ControlPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-control',
  templateUrl: 'control.html',
})
export class ControlPage {
  cod_sol: any;
  token: any;
  htmlContent: SafeHtml; 
  @ViewChild('pdfContainer') pdfContainer: ElementRef;
 
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public storage: Storage,
              public service: DataserviceProvider,
              private sanitizer: DomSanitizer
              ) {
    this.cod_sol = this.navParams.get("cod");
    console.log("request", this.cod_sol);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ControlPage');
    this.storage.get("token").then((val) => {
      this.token = val;
      console.log("request Inspect Token", this.token);
      this.control(this.cod_sol, this.token);
    });
  }

  control(cod_sol: any, token: string){
    this.service.getReport(cod_sol, token)
    .then((data: any) => {
      console.log('Resposta Laudo',data);
      this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(data._body);
    })
  }

  

}


