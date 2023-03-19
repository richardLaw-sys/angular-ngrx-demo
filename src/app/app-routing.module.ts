import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { BrowserUtils } from '@azure/msal-browser';
import { DashboardComponent } from './components/layout/dashboard.component';
import { PostComponent } from './pages/post/post.component';
import { UsersComponent } from './pages/user/users.component';
import { ViewUserComponent } from './pages/user/view-user.componenet';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: UsersComponent, canActivate: [MsalGuard] },
      { path: 'post', component: PostComponent, canActivate: [MsalGuard] },
      {
        path: 'user/:id',
        component: ViewUserComponent,
        canActivate: [MsalGuard],
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation:
        !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup()
          ? 'enabledNonBlocking'
          : 'disabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
