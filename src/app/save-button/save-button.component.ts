import { Component, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { SaveService } from './save.service';

@Component({
  selector: 'app-save-button',
  template: `
  <ng-container *ngIf="auth.user$ | async as user; else noUser">
    <button *ngIf="user.saved.includes(slug); else notSaved"
      class="save-btn btn btn__red__outlined" 
      (click)="saveService.unsave(slug)">
      Already Saved!
    </button>

     <ng-template #notSaved>
      <button class="save-btn btn btn__green__outlined" 
        (click)="saveService.save(slug)">
        Save this blog
      </button>
    </ng-template>
  </ng-container>
  
  <ng-template #noUser>
    <a href="/login">
      <button class="save-btn btn btn__primary__outlined">Login to save</button>
    </a>
  </ng-template>
  `,
})
export class SaveButtonComponent {

  @Input() slug: string;

  constructor(public saveService: SaveService, public auth: AuthService) {}

}
