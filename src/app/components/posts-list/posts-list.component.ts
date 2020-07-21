import { Component, OnInit } from '@angular/core';
import { DatabaseService, Post } from '../../services/database.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {
  p = 1;
  posts: Post[];
  searchValue = '';
  source = 'all sources';
  constructor(private db: DatabaseService) {}

  ngOnInit(): void {
    this.fetchPosts();
  }
  fetchPosts(): void {
    this.db.fetchPosts('posts').subscribe((posts) => {
      this.posts = posts;
    });
  }

  filterPosts(value): void {
    this.searchValue = value;
  }

  filterBySource(value): void {
    this.source = value;
  }
}
