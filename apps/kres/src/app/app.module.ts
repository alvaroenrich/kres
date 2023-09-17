import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { KResAppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { KResNxWelcomeComponent } from './nx-welcome.component';

@NgModule({
  declarations: [KResAppComponent, KResNxWelcomeComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [KResAppComponent],
})
export class KResAppModule {}
