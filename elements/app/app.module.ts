import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from 'src/environments/environment';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';

import { UserDataComponent } from './user-data/user-data.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AllowIfComponent } from './allow-if/allow-if.component';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import { SaveButtonComponent } from './save-button/save-button.component';
import { FormsModule } from '@angular/forms';
import { PlaceHolderComponent } from './place-holder/place-holder.component';

const elements: any[] = [
  [UserDataComponent, 'user-data'],
  [LoginFormComponent, 'login-form'],
  [AllowIfComponent, 'allow-if'],
  [ThemeSwitcherComponent, 'theme-switcher'],
  [SaveButtonComponent, 'save-button'],
  [PlaceHolderComponent, 'place-holder']
];

@NgModule({
  declarations: [
    UserDataComponent,
    LoginFormComponent,
    AllowIfComponent,
    ThemeSwitcherComponent,
    SaveButtonComponent,
    PlaceHolderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
