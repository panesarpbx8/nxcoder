import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-data',
  template: `
    <span *ngIf="auth.user$ | async as user">
      <span *ngIf="field === 'photoURL'">
        <img class="user-image" [src]="user.photoURL" [alt]="user.displayName">
      </span>
      <span *ngIf="field === 'displayName'">
        <span>{{ user.displayName }}</span>
      </span>
      <span *ngIf="field === 'email'">
        <span>{{ user.email }}</span>
      </span>
      <span *ngIf="field === 'isPro'">
        <span class="pro-badge">PRO</span>
      </span>
      <span *ngIf="field === 'shortName'">
        <span>{{ shortName(user.displayName) }}</span>
      </span>
    </span>
  `,
  styles: [`
    .user-image {
      height: 30px;
      width: 30px;
      border-radius: 100%;
      vertical-align: middle;
    }
  `],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class UserDataComponent {

  @Input() field: string;

  constructor(public auth: AuthService) { }

  shortName(displayName: string): string {
    const [first, last] = displayName.split(' ');
    return (last ? `${first[0]}. ${last}` : first);
  }

}
