import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { UserToPost } from './Models/userToPost.model';
import { PostService } from './Services/post/post.service';
import { UserService } from './Services/user/user.service';
import { LayoutService } from './Services/layout/layout.service';
import { UserDataManagerService } from './Services/DataManager/userDataManager/user-data-manager.service';
import { PostDataManagerService } from './Services/DataManager/postDataManager/post-data-manager.service';
import { AuthService } from './Services/DataManager/auth/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MessagePostsApp';

  constructor(
    private router: Router,
    private postService: PostService,
    private userService: UserService,
    private authService: AuthService,
    private layoutService: LayoutService,
    private userDataManager: UserDataManagerService,
    private postDataManager: PostDataManagerService,
  ) {
    this.mapData();
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let currentRoute = this.router.routerState.root;
          while (currentRoute.firstChild) {
            currentRoute = currentRoute.firstChild;
          }
          return currentRoute;
        }),
        /* tslint:disable:no-string-literal */
        map((route) => route.snapshot.data['title'])
      )
      .subscribe((title) => {
        this.layoutService.pageTitle.next(title);
      });

    if (window.location.pathname === '/') {
      this.router.navigate(['/Home']);
    }
  }

  mapData(): void {
    const posts$ = this.postService.getAllPosts();
    const users$ = this.userService.getUsers();

    forkJoin([posts$, users$]).subscribe(([posts, users]) => {
      const mappedData = posts.map((post) => {
        const matchingItem = users.find((user) => user.id === post.userId);
        return UserToPost.mapData(post, matchingItem);
      });

      this.postDataManager.setPosts(mappedData);
      this.userDataManager.setUsers(users);
      if (!this.authService.getActiveUserInfo()) {
        this.authService.reflesh();
      }
    });
  }
}
