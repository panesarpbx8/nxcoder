import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from 'src/environments/environment';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';

import { UserDataComponent } from './auth/user-data/user-data.component';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { AllowIfComponent } from './auth/allow-if/allow-if.component';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import { SaveButtonComponent } from './save-button/save-button.component';

const elements: any[] = [
  [UserDataComponent, 'user-data'],
  [LoginFormComponent, 'login-form'],
  [AllowIfComponent, 'allow-if'],
  [ThemeSwitcherComponent, 'theme-switcher'],
  [SaveButtonComponent, 'save-button'],
];

@NgModule({
  declarations: [
    UserDataComponent,
    LoginFormComponent,
    AllowIfComponent,
    ThemeSwitcherComponent,
    SaveButtonComponent,
  ],
  imports: [
    BrowserModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
})
export class AppModule { 
  
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    for (const [component, selector] of elements) {
      const el = createCustomElement(component, { 
        injector: this.injector 
      });
      customElements.define(selector, el);
    }
  }

}
