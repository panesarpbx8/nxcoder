import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-logout-button',
  template: `
    <button *ngIf="auth.user$ | async" (click)="auth.logout()">Logout</button>
  `,
})
export class LogoutButtonComponent {
  constructor(public auth: AuthService) { }
}
