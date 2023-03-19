import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  template: ` <h1>{{ this.user ? this.user.email : '' }}</h1>
    <h1>{{ this.user ? this.user.name : '' }}</h1>
    <mat-spinner *ngIf="this.loading"></mat-spinner>
    <app-error
      [errorTitle]="this.error"
      (reload)="this.tryAgain()"
      *ngIf="this.isError && !loading"
    ></app-error>`,
  styles: [``],
})
export class PostComponent implements OnInit, OnDestroy {
  user?: User;
  loading = false;
  error: string = '';
  isError = false;
  isAlive = true;

  constructor(private postService: PostService) {}

  ngOnDestroy() {
    this.isAlive = false;
  }

  async ngOnInit() {
    await this.fetchData();
    await this.fetchGrapUserData();
  }

  async fetchGrapUserData() {
    const observer$ = await this.postService.getUserByGraphApi();
    observer$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => {
      this.user = data;
    });
  }

  async fetchData() {
    const observer$ = await this.postService.getUserByApi();
    observer$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => {
      this.user = data;
    });
  }

  tryAgain() {
    this.postService.getUserByApi();
  }
}
