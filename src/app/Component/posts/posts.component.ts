import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/Models/post.model';
import { AuthService } from 'src/app/Services/DataManager/auth/auth.service';
import { PostDataManagerService } from 'src/app/Services/DataManager/postDataManager/post-data-manager.service';
import { LayoutService } from 'src/app/Services/layout/layout.service';
import { Generator } from 'src/app/Utilities/Generator';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  postForm: FormGroup;
  originalData: FormGroup;
  id: number;
  notActiveUserPost = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private layoutService: LayoutService,
    private authService: AuthService,
    private postDataManagerService: PostDataManagerService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id');
      this.getPost(this.id);
    });
  }

  getPost(id: number): void {
    const user = this.authService.getActiveUserInfo();
    const post: Post = this.postDataManagerService.getPost(id);
    this.notActiveUserPost = (post?.userId === user.id || this.id === 0) ? false : true;

    this.postForm = this.formBuilder.group({
      title: [this.notActiveUserPost || this.id === 0 ? '' : post.title, [Validators.maxLength(200), Validators.required]],
      message: [this.notActiveUserPost || this.id === 0 ? '' : post.body, [Validators.maxLength(2000), Validators.required]],
    });

    this.originalData = this.postForm.value;
  }

  createPost(id: number): void {
    let posts = this.postDataManagerService.getPosts();
    const user = this.authService.getActiveUserInfo();

    const newPost = {
      id: this.id === 0 ? Generator.generateUniqueId() : id,
      website: user.website,
      name: user.fullName,
      title: this.postForm.value.title,
      body: this.postForm.value.message,
      userId: user.id,
    };

    if (this.id !== 0) {
      posts = posts.map(post => {
        if (post.id === this.id) {
          return { ...post, title: this.postForm.value.title, body: this.postForm.value.message };
        }
        return post;
      });
    } else {
      posts = [newPost, ...posts];
    }
    this.postDataManagerService.setPosts(posts);
    this.router.navigate(['/Home']);
  }

  deletePost(): void {
    if (window.confirm('Are you sure to delete?')) {
      const posts = this.postDataManagerService.getPosts();
      this.postDataManagerService.setPosts(posts.filter(post => post.id !== this.id));
      this.router.navigate(['/Home']);
    }
  }



  isDataChanged(): void {
    const isChanged: boolean = JSON.stringify(this.postForm.value) !== JSON.stringify(this.originalData);
    this.layoutService.isDataChange.next(isChanged);
  }
}
