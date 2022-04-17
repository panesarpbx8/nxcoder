import { Component } from '@angular/core';

type Theme = 'light' | 'dark';

@Component({
  selector: 'app-theme-switcher',
  template: `
    <a (click)="toggle()">
      <i *ngIf="current === 'dark'" class="fa-solid fa-sun"></i>
      <i *ngIf="current === 'light'" class="fa-solid fa-moon"></i>
    </a>
  `,
  styles: [`
    i {
      font-size: 1.5rem,
    }
    i:hover {
      cursor: pointer;
    }
  `],
})
export class ThemeSwitcherComponent {

  defaultTheme: Theme = 'light';
  current: Theme = 'light';

  constructor() { 
    if (!localStorage['theme']) {
      localStorage['theme'] = this.defaultTheme;
    } else {
      document.body.classList.add(localStorage['theme']);
    }
  }

  toggle(): void {
    document.body.classList.toggle('dark');

    if (document.body.classList.contains('dark')) {
      this.current = 'dark';
      localStorage['theme'] = 'dark';
      
    } else {
      this.current = 'light';
      localStorage['theme'] = 'light'
    }
  }
}
