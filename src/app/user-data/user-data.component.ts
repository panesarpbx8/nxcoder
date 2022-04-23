import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-data',
  template: `
    <div *ngIf="auth.user$ | async as user">
      <div *ngIf="field === 'photoURL'">
        <img class="user-image" [src]="user.photoURL" [alt]="user.displayName">
      </div>
      <div *ngIf="field === 'displayName'">
        <span>{{ user.displayName }}</span>
      </div>
      <div *ngIf="field === 'email'">
        <span>{{ user.email }}</span>
      </div>
      <div *ngIf="field === 'isPro'">
        <span class="pro-badge">PRO</span>
      </div>
      <div *ngIf="field === 'shortName'">
        <span>{{ shortName(user.displayName) }}</span>
      </div>
    </div>
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
