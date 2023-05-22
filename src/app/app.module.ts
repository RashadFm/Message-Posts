import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppConfig } from 'app.config';
// components
import { AppComponent } from './app.component';
import { IConfig } from 'ngx-mask';
import { HomeComponent } from './Component/home/home.component';
import { LoginComponent } from './Component/login/login.component';
import { PostsComponent } from './Component/posts/posts.component';
import { LayoutComponent } from './Component/layout/layout.component';
import { PaginationComponent } from './Component/pagination/pagination.component';
import { InputRestrictionDirective } from './Directive/input-restriction.directive';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

export function initializeApp(appConfig: AppConfig): any {
  return () => appConfig.load();
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PostsComponent,
    LayoutComponent,
    PaginationComponent,
    InputRestrictionDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig, HttpClientModule],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
