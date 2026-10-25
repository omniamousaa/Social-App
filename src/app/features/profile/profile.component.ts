import { Component, inject, signal, WritableSignal, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IUserData, Iposts } from '../../core/models/iposts.interface';
import { PostsService } from '../../core/services/posts/posts.service';

@Component({
  selector: 'app-profile',
  imports: [NavbarComponent, RouterLinkActive, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {

  private readonly postsService = inject(PostsService);

  loggedInUserData: WritableSignal<IUserData> = signal({} as IUserData);

  myPosts: WritableSignal<Iposts[]> = signal([]);

  ngOnInit(): void {
    this.saveUserData();
    this.getMyPosts();
  }

  saveUserData(): void {
    const userData = localStorage.getItem('socialUser');

    if (userData) {
      this.loggedInUserData.set(JSON.parse(userData));
    }
  }


  //   loggedInUserData:WritableSignal<IUserData>=signal({} as IUserData)

  //   ngOnInit():void{
  //   this.saveUserData()
  // }

  //   saveUserData(): void {
  //   this.loggedInUserData.set(JSON.parse(localStorage.getItem('socialUser')!));
  //   console.log(this.loggedInUserData());
  // }


  getMyPosts(): void {
    this.postsService.getAllPosta().subscribe({
      next: (res) => {
        const userId = this.loggedInUserData()._id;

        const posts = res.data.posts.filter(
          (post: Iposts) => post.user._id === userId
        );

        this.myPosts.set(posts);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
