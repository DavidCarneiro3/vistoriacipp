// ANGULAR AND IONIC 
import {  ErrorHandler, NgModule } from "@angular/core";
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

// PROVIDERS
import { DataserviceProvider } from '../providers/dataservice/dataservice';
import { PagarmeProvider } from '../providers/pagarme/pagarme';
import { DocumentViewer } from '@ionic-native/document-viewer'


// MODULES 


import { MyApp } from './app.component';
import { environment } from '../environments/environment';
import { HomePage } from "../pages/home/home";
import { ListRequestPage } from "../pages/list-request/list-request";
import { ProfilePage } from "../pages/profile/profile";
import { RequestDetailPage } from "../pages/request-detail/request-detail";
import { RequestsPage } from "../pages/requests/requests";
import { LoginPage } from "../pages/login/login";
import { HttpModule } from "@angular/http";
import { ListSchedulerPage } from "../pages/list-scheduler/list-scheduler";
import { EtuforProvider } from '../providers/etufor/etufor';
import { SignupPage } from "../pages/signup/signup";
import { SchedulePage } from "../pages/schedule/schedule";
import { ReportPage } from "../pages/report/report";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { ForgetPasswordPage } from "../pages/forget-password/forget-password";
import { ChangePassPage } from "../pages/change-pass/change-pass";
import { CieloProvider } from "../providers/cielo/cielo";





@NgModule({
    declarations: [
        MyApp,
        HomePage,
        RequestsPage,
        RequestDetailPage,
        ListRequestPage,
        ProfilePage,
        LoginPage,
        ListSchedulerPage,
        SignupPage,
        SchedulePage,
        ReportPage,
        ForgetPasswordPage,
        ChangePassPage
        
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
        BrMaskerModule,
        
        
    ],
    
    exports: [TextMaskModule],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        RequestsPage,
        RequestDetailPage,
        ListRequestPage,
        ProfilePage,
        LoginPage,
        ListSchedulerPage,
        SignupPage,
        SchedulePage,
        ReportPage,
        ForgetPasswordPage,
        ChangePassPage
        
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
        FileTransfer,
        File,
        FileOpener,
        DocumentViewer,
        InAppBrowser,
        CieloProvider
    ]
})
export class AppModule {
}
