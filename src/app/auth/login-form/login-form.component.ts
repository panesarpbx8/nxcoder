import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit {

  private sub: Subscription;

  state: 'login' | 'signup' = 'login';
  user: User;
  email: string;
  password: string;
  displayName: string;
  error: string;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.sub = this.auth.user$.subscribe(user => {
      this.user = user;
    });
  }

  async onSubmit() {
    try {      
      if (this.state === 'login')
        await this.auth.login({
          email: this.email,
          password: this.password,
        });
      
      if (this.state === 'signup')
        await this.auth.createAccount({
          email: this.email, 
          password: this.password, 
          displayName: this.displayName,
        });
      
    } catch (e) {
      this.error = e.message;
    }
  } 

  async oAuthLogin(type: 'google') {
    try {
      if (type === 'google') {
        await this.auth.loginWithGoogle();
      }

    } catch (e) {
      if (e.code === 'auth/popup-closed-by-user') {
        this.error = 'User cancelled login';
        return;
      }
      this.error = e.message;
    }
  }

  toggleState() {
    this.state = this.state === 'login' ? 'signup' : 'login';
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

}
