import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../services/database.service';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(posts: Post[], search: string = ''): Post[] {
    if (!search.trim()) {
      return posts;
    }
    return posts.filter((post) => {
      return (
        post.heading.toLowerCase().includes(search.toLowerCase()) ||
        post.description.toLowerCase().includes(search.toLowerCase())
      );
    });
  }
}
