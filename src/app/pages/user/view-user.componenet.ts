import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { filter, map, switchMap, takeWhile } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-services';

@Component({
  selector: 'app-view-user',
  template: `
    <h1>{{ this.user ? this.user.email : '' }}</h1>
    <h1>{{ this.user ? this.user.name : '' }}</h1>
  `,
  styles: [``],
})
export class ViewUserComponent implements OnDestroy {
  isAlive = true;
  user?: User;
  loading = false;
  error: string = '';
  isError = false;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.fetchUserData();
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  fetchUserData() {
    const Id: number = Number(this.route.snapshot.paramMap.get('id'));
    const response$ = this.userService.getUserById(Id);
    const userData$ = response$[1];
    const loading$ = response$[0];
    const error$ = response$[2];

    userData$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => {
      this.user = data;
    });
    loading$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => {
      this.loading = data;
    });
    error$.pipe(takeWhile(() => this.isAlive)).subscribe((error) => {
      this.error = error;
      this.isError = this.error.length > 0 ? true : false;
    });
  }
}
