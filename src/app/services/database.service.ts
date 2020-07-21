import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

export interface Post {
  id?: string;
  heading: string;
  description: string;
  content: string;
  date: string;
  author: string;
  imgUrl: string;
  source: string;
}
export interface Source {
  id?: string;
  source: string;
}

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  postsRef: AngularFireList<Post>;
  sourcesRef: AngularFireList<Post>;
  posts: Observable<Post[]>;
  sources: Observable<Post[]>;
  constructor(private db: AngularFireDatabase, private http: HttpClient) {}

  fetchPosts(data): Observable<Post[]> {
    this.postsRef = this.db.list('/' + data);
    this.posts = this.postsRef.valueChanges();
    return this.posts;
  }
  fetchSources(data): Observable<Post[]> {
    this.sourcesRef = this.db.list('/' + data);
    this.sources = this.sourcesRef.valueChanges();
    return this.sources;
  }

  addPost(post): void {
    const ref = this.postsRef.push(post);
    post.id = ref.key;
    ref.set(post);
  }
  addSource(source): void {
    const ref = this.sourcesRef.push(source);
    source.id = ref.key;
    ref.set(source);
  }
  getPostById(id): Observable<any> {
    return this.db.object('/posts/' + id).valueChanges();
  }
}
