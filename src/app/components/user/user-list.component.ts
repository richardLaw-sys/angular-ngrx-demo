import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-list',
  template: `
    <div fxLayout="row wrap" fxLayoutAlign="center start" fxLayoutGap="30px">
      <app-user-card [user]="user" *ngFor="let user of users"></app-user-card>
    </div>
  `,
  styles: [``],
})
export class UserListComponent {
  @Input() users?: User[];

  constructor() {}
}
