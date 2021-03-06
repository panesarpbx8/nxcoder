import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { UserDataComponent } from './user-data/user-data.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AllowIfComponent } from './allow-if/allow-if.component';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import { SaveButtonComponent } from './save-button/save-button.component';
import { PlaceHolderComponent } from './place-holder/place-holder.component';
import { LogoutButtonComponent } from './logout-button/logout-button.component';
import { GoogleButtonComponent } from './google-button/google-button.component';
import { UserJsonComponent } from './user-json/user-json.component';
import { LoaderComponent } from './loader/loader.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

const elements: [any, string][] = [
  [UserDataComponent, 'user-data'],
  [LoginFormComponent, 'login-form'],
  [AllowIfComponent, 'allow-if'],
  [ThemeSwitcherComponent, 'theme-switcher'],
  [SaveButtonComponent, 'save-button'],
  [PlaceHolderComponent, 'place-holder'],
  [LogoutButtonComponent, 'logout-button'],
  [GoogleButtonComponent, 'google-button'],
  [UserJsonComponent, 'user-json'],
  [LoaderComponent, 'element-loader'],
  [SearchBarComponent, 'search-bar'],
  [NavBarComponent, 'nav-bar'],
];

@NgModule({
  declarations: [
    UserDataComponent,
    LoginFormComponent,
    AllowIfComponent,
    ThemeSwitcherComponent,
    SaveButtonComponent,
    PlaceHolderComponent,
    LogoutButtonComponent,
    GoogleButtonComponent,
    UserJsonComponent,
    LoaderComponent,
    SearchBarComponent,
    NavBarComponent,
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
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    for (const [component, selector] of elements) {
      const element = createCustomElement(component, { 
        injector: this.injector
      });
      customElements.define(selector, element);
    }
  }
}
