import { Component, OnInit } from '@angular/core';
import hotroute from 'hotroute';

@Component({
  selector: 'app-hotroute',
  template: ``,
})
export class HotrouteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const router = hotroute({ log: true, prefetch: true });
    console.log(router);
    console.log('Hotroute component');
  }

}
