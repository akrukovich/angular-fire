import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService, Post } from '../../services/database.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  post: Post;
  id: string;
  constructor(
    private router: ActivatedRoute,
    private db: DatabaseService,
    private navigator: Router
  ) {}

  ngOnInit(): void {
    this.router.params
      .pipe(
        switchMap((params) => {
          return this.db.getPostById(params.id);
        })
      )
      .subscribe((post) => {
        !post ? this.navigator.navigate(['**']) : (this.post = post);
      });
  }
}
