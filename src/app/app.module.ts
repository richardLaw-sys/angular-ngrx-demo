import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { LayoutComponent } from './components/layout/app-layout.component';
import { DashboardComponent } from './components/layout/dashboard.component';
import { HeaderComponent } from './components/layout/header.component';
import { ErrorComponent } from './components/shared/error.component';
import { UsersComponent } from './pages/user/users.component';
import { PostComponent } from './pages/post/post.component';
import { StoreModule } from '@ngrx/store';
import { UserService } from './services/user-services';
import { ApiService } from './services/api.service';
import { HttpService } from './services/http.service';
import { UserCardComponent } from './components/user/user-card.component';
import { UserListComponent } from './components/user/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { rootReducer } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    DashboardComponent,
    ErrorComponent,
    PostComponent,
    UsersComponent,
    UserCardComponent,
    UserListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    FlexModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot(rootReducer),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [HttpService, ApiService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
