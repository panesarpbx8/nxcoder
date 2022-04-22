import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import hotroute from 'hotroute';

if (environment.production) {
  enableProdMode();
}

const router = hotroute({ log: true, prefetch: true });
console.log(router);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
