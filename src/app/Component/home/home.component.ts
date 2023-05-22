import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/DataManager/auth/auth.service';
import { PostDataManagerService } from 'src/app/Services/DataManager/postDataManager/post-data-manager.service';
import { UserToPost } from '../../Models/userToPost.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private postDataManager: PostDataManagerService,
  ) { }

  postsLength: number;
  postsPerPage = 10;
  currentPage = 1;

  ngOnInit(): void { }

  get isLogged(): boolean {
    return this.authService.getActiveUserInfo()?.isLogged;
  }

  isActiveUser(userId: number): boolean {
    return this.authService.getActiveUserInfo()?.id === userId;
  }

  goToPostPage(id: number, userId: number): void {
    if (this.isLogged && this.isActiveUser(userId)) {
      this.router.navigate(['/Posts', id]);
    }
    return;
  }

  goToPostUserwebSite(webSite: string): void {
    window.open(webSite);
  }

  get messagePosts(): UserToPost[] {
    const messagePosts: UserToPost[] = this.postDataManager.getPosts();
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    const endIndex = startIndex + this.postsPerPage;
    this.postsLength = messagePosts?.length;
    return messagePosts.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }
}
