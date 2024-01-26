import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen/';
import { StatusBar } from '@ionic-native/status-bar/';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {

    rootPage: any = LoginPage;
    token: string;
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private storage: Storage,
        private statusBar: StatusBar
      ) {
        this.initializeApp();
      }
    
      initializeApp() {
        
        this.platform.ready().then(() => {
          console.log('Plataforma',this.platform.platforms())
          this.statusBar.styleDefault();
          this.splashScreen.hide();

          // this.storage.get('token')
          // .then((val) => {
          //     this.token = val
               this.storage.clear()
          //     console.log('Home Token in Components',this.token)
          //     if(this.token != null){
          //       this.rootPage = LoginPage
          //     }
            
          // })
        });
      }

}
