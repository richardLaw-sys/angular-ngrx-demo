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
        *ngIf="!this.loading && !this.isError"
        [users]="this.users"
      ></app-user-list>
      <mat-spinner *ngIf="this.loading"></mat-spinner>
      <app-error
        [errorTitle]="this.error"
        (reload)="this.tryAgain()"
        *ngIf="this.isError && !loading"
      ></app-error>
      <button
        *ngIf="!this.loading && !this.isError"
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
  error: string = '';
  isError = false;
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
    const error$ = observer$[2];

    userData$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => {
      this.users = data;
    });
    loading$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => {
      this.loading = data;
    });
    error$.pipe(takeWhile(() => this.isAlive)).subscribe((error) => {
      this.error = error;
      this.isError = this.error.length > 0 ? true : false;
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
