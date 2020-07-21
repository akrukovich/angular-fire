import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../services/database.service';

@Pipe({
  name: 'searchBySource',
})
export class SearchBySourcePipe implements PipeTransform {
  transform(posts: Post[], source: string = 'all sources'): Post[] {
    if (source === 'all sources') {
      return posts;
    }
    return posts.filter((post) => {
      return post.source.toLowerCase() === source;
    });
  }
}
