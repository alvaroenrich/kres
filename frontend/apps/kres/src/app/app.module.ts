import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KResAppComponent } from './app.component';
import { KResAppRoutingModule } from './app-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [KResAppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    KResAppRoutingModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
      defaultLanguage: 'en'
    }),
  ],
  providers: [],
  bootstrap: [KResAppComponent],
})
export class KResAppModule {}
