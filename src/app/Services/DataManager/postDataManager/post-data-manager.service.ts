import { Injectable } from '@angular/core';
import { Post } from 'src/app/Models/post.model';
import { UserToPost } from 'src/app/Models/userToPost.model';

@Injectable({
  providedIn: 'root'
})
export class PostDataManagerService {

  constructor() { }

  setPosts(mappedData: any): void {
    localStorage.setItem('messagePosts', JSON.stringify(mappedData));
  }

  getPosts(): UserToPost[] {
    return JSON.parse(localStorage.getItem('messagePosts'));
  }

  getPost(id: number): Post {
    const messagePosts: Post[] = JSON.parse(localStorage.getItem('messagePosts'));
    return messagePosts.find(post => post.id === id);
  }
}
