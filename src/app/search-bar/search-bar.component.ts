import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { debounceTime, fromEvent, Observable, distinctUntilChanged } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Blog } from 'src/util/blog';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, AfterViewInit {
  
  @ViewChild('field') field: ElementRef<HTMLInputElement>;
  @Input() blogs: string;

  _blogs: Blog[];
  searchedBlogs$: Observable<Blog[]>;
  
  constructor(public searchService: SearchService) {}

  ngOnInit(): void {
    this._blogs = JSON.parse(this.blogs);
  }

  ngAfterViewInit(): void {
    this.searchedBlogs$ = fromEvent(this.field.nativeElement, 'keyup').pipe(
      distinctUntilChanged(),
      debounceTime(500),
      map(event => {
        const entry = event.target['value'];
        return this.searchService.find(entry, this._blogs);
      }),
    );
  }

}
