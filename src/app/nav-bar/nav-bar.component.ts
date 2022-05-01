import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @ViewChild('links') links: ElementRef<HTMLDivElement>;

  github: string = 'https://www.github.com/panesarpbx8/nxcoder';

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  toggle() {
    this.links.nativeElement.classList.toggle('open');
    console.log('toggle');
    
  }

}
