import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-services';

@Component({
  selector: 'app-users',
  template: `
    <div fxLayout="column" fxLayoutAlign="start center" fxLayoutGap="30px">
      <app-user-list
        *ngIf="!this.loading && !this.error"
        [users]="this.users"
      ></app-user-list>
      <mat-spinner *ngIf="this.loading"></mat-spinner>
      <app-error
        (reload)="this.tryAgain()"
        *ngIf="this.error && !loading"
      ></app-error>
      <button
        *ngIf="!this.loading && !this.error"
        (click)="addUser()"
        mat-raised-button
        color="primary"
      >
        Add User
      </button>
    </div>
  `,
  styles: [``],
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  loading = false;
  error = false;
  isAlive = true;

  constructor(private dialog: MatDialog, private userService: UserService) {}

  ngOnDestroy() {
    this.isAlive = false;
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    const observer$ = this.userService.getUserList();
    const userData$ = observer$[1];
    const loading$ = observer$[0];

    userData$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => {
      this.users = data;
    });
    loading$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => {
      this.loading = data;
    });
  }

  tryAgain() {
    this.userService.getUserList(true);
  }

  addUser() {}
}

// reducer -> it contain a state (global state)
// it will take an action -> it will return a new state

// action -> it will contain a payload and a type

// Dependency Injection Principle
// you should not depend on something directly
// component -> youtube repo -> apiService -> http Service -> http client
