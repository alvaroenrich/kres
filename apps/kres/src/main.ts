import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { KResAppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(KResAppModule)
  // eslint-disable-next-line no-console
  .catch((err) => console.error(err));
