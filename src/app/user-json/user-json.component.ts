import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-json',
  template: `
    <pre *ngIf="auth.user$ | async as user">{{ user | json }}</pre>
  `,
})
export class UserJsonComponent {

  constructor(public auth: AuthService) { }

}
