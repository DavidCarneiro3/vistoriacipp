import { AppModule } from './app.module';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { defineCustomElements } from '@ionic/pwa-elements/loader';
defineCustomElements(window);
platformBrowserDynamic().bootstrapModule(AppModule);
