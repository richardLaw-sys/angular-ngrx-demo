import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-services';

@Component({
  selector: 'app-user-card',
  template: `
    <mat-card
      (click)="open()"
      style="margin-bottom: 30px;"
      fxLayout="column"
      fxLayoutGap="30px"
      fxLayoutAlign="start stretch"
    >
      <mat-card-title>{{ this.user?.name }}</mat-card-title>
      <mat-card-content>{{ this.user?.email }}</mat-card-content>
      <button mat-raised-button color="warn">View</button>
      <button (click)="delete()" mat-raised-button color="warn">Delete</button>
      <button (click)="update()" mat-raised-button color="primary">
        Update
      </button>
    </mat-card>
  `,
  styles: [``],
})
export class UserCardComponent {
  @Input() user?: User;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  delete() {}

  update() {}

  open() {
    this.router.navigate(['user', this.user?.id]);
  }
}
