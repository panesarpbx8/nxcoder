import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth.service";
import { User } from "../user.interface";

type Level = 'logged' | 'pro';

@Component({
  selector: 'app-allow-if',
  template: `
    <slot *ngIf="allowed"></slot>
    <slot *ngIf="!allowed" name="else"></slot>
  `,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AllowIfComponent implements OnInit, OnDestroy {

  @Input() level: Level;

  private sub: Subscription;
  private user: User;

  constructor(
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.sub = this.auth.user$.subscribe((user: User) => {
      this.user = user;
    });
  }

  get allowed() {
    // if user is logged in
    if (this.level === 'logged' && this.user) {
      return true; 
    }

    // if user is logged in and is pro
    if (this.level === 'pro' && this.user && this.user.isPro) {    
      return true;
    }

    return false;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
