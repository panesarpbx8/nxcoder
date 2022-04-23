import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-place-holder',
  template: `
    <div class="place-holder" [style.height]="height"></div>
  `,
})
export class PlaceHolderComponent implements OnInit {

  @Input() height: string;

  constructor() { }

  ngOnInit(): void {
  }

}
