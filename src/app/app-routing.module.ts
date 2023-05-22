import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { LayoutComponent } from './Component/layout/layout.component';
import { LoginComponent } from './Component/login/login.component';
import { PostsComponent } from './Component/posts/posts.component';
import { AuthGuard } from './Guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'Home', component: HomeComponent, data: { title: 'Home' } },
      { path: 'Login', component: LoginComponent, data: { title: 'Login' } },
      { path: 'Posts/:id', component: PostsComponent, canActivate: [AuthGuard], data: { title: 'Posts' } },
    ]
  },
  {
    path: '',
    redirectTo: '/Home',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'Home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
