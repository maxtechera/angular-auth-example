import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { TokenInterceptor } from './auth/token.interceptor';
import { CustomMaterialModule } from './material.module';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersListComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    CustomMaterialModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      {
        path: 'users',
        component: UsersListComponent,
        canActivate: [AuthGuard],
      },
      { path: '', component: WelcomeComponent, pathMatch: 'full' },
    ]),
  ],
  providers: [
    AuthGuard,
    AuthService,
    UsersService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
