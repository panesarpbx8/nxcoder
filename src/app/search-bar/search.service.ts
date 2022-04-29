import { Injectable } from '@angular/core';
import { Blog } from 'src/util/blog';

@Injectable({ providedIn: 'root' })
export class SearchService {
  
  find(entry: string, blogs: Blog[]): Blog[] {
    return blogs.filter(blog => 
      blog.frontmatter.title.includes(entry) ||
      blog.frontmatter.hashtags.includes(entry) ||
      blog.frontmatter.headline.includes(entry));
  }

}
