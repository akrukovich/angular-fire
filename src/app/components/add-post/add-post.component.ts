import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  form: FormGroup;
  constructor(private db: DatabaseService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      heading: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      imgUrl: new FormControl('', Validators.required),
      source: new FormControl('', Validators.required),
    });
  }

  submit(): void {
    this.db.addPost(this.form.value);
    this.db.addSource({ source: this.form.value.source });
    this.router.navigate(['posts']);
  }

  reset(): void {
    this.form.reset();
    this.router.navigate(['posts']);
  }
}
