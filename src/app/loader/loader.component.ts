import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <div class="force-center">
      <i class="rotate fa-solid fa-spinner-third"></i>
    </div>
  `,
})
export class LoaderComponent {

  constructor() { }

}
