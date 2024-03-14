// ANGULAR AND IONIC 
import {  CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { TextMaskModule } from 'angular2-text-mask';
import { IonicStorageModule } from "@ionic/storage";
import { StatusBar } from "@ionic-native/status-bar";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from "@ionic-native/splash-screen";
import { Push } from "@ionic-native/push";
import { AndroidPermissions } from "@ionic-native/android-permissions";
import { HTTP } from '@ionic-native/http';
import { CardIO } from '@ionic-native/card-io';
import { Clipboard } from '@ionic-native/clipboard';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { Camera } from '@ionic-native/camera';
// import { File } from "@ionic-native/file";
// import { FileOpener } from "@ionic-native/file-opener";
import { Geolocation } from '@ionic-native/geolocation';

// PROVIDERS
import { DataserviceProvider } from '../providers/dataservice/dataservice';
import { PagarmeProvider } from '../providers/pagarme/pagarme';

// MODULES 


import { MyApp } from './app.component';
import { environment } from '../environments/environment';
import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { HttpModule } from "@angular/http";
import { EtuforProvider } from '../providers/etufor/etufor';
import { InspectPage } from "../pages/inspect/inspect";
import { ListRequestPage } from "../pages/list-request/list-request";
import { TabsPage } from "../pages/tabs/tabs";
import { ProfilePage } from "../pages/profile/profile";
import { ControlPage } from "../pages/control/control";
import { InfoPage } from "../pages/info/info";





@NgModule({
    declarations: [
        MyApp,
        HomePage,
        LoginPage,
        InspectPage,
        TabsPage,
        ProfilePage,
        ListRequestPage,
        ControlPage,
        InfoPage
        
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp, {
            // mode: 'ios',
            backButtonText: '',
            platforms: {
                ios: {
                    backButtonText: '',
                }
            },
         
        }),
        
        TextMaskModule,
        HttpModule,
        IonicStorageModule.forRoot(),
        BrMaskerModule
    ],
    
    exports: [TextMaskModule],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        LoginPage,
        InspectPage,
        TabsPage,
        ProfilePage,
        ListRequestPage,
        ControlPage,
        InfoPage
        
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        Push,
        HTTP,
        AndroidPermissions,
        InAppBrowser,
        PagarmeProvider,
        CardIO,
        Clipboard,
        DataserviceProvider,
        EtuforProvider,
        Camera,
        Geolocation,
        // File,
        // FileOpener
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {
}
