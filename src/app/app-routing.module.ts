import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/layout/dashboard.component';
import { PostComponent } from './pages/post/post.component';
import { UsersComponent } from './pages/user/users.component';
import { ViewUserComponent } from './pages/user/view-user.componenet';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: UsersComponent },
      { path: 'post', component: PostComponent },
      { path: 'user/:id', component: ViewUserComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
