import { Iposts, IUserData } from '../../../core/models/iposts.interface';
import { PostsService } from './../../../core/services/posts/posts.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommentsComponent } from '../comments/comments.component';

@Component({
  selector: 'app-posts',
  imports: [RouterLink, CommentsComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {
showComments = signal(false);
selectedPostId = signal('');

comments: WritableSignal<any[]> = signal([]);
openComments(postId: string) {
  console.log('Post ID:', postId);

  this.selectedPostId.set(postId);
  this.showComments.set(true);

  this.postsService.getPostComments(postId).subscribe({
    next: (res) => {
  console.log('Post ID:', postId);
  console.log('Comments:', res.data.comments);
  console.log('Pagination:', res.meta.pagination);

  this.comments.set(res.data.comments);
},
    error: (err) => console.error(err)
  });
}

closeComments() {
  this.showComments.set(false);
}
// private router = inject(Router);
// private route = inject(ActivatedRoute);

// selectedPost: Iposts | null = null;
// showDetails = signal(false);

// openDetails(post: Iposts) {
//   this.selectedPost = post;
//   this.showDetails.set(true);

//   this.router.navigate([], {
//     relativeTo: this.route,
//     queryParams: { postId: post._id },
//     queryParamsHandling: 'merge'
//   });
// }

// closeDetails() {
//   this.showDetails.set(false);
//   this.selectedPost = null;

//   this.router.navigate([], {
//     relativeTo: this.route,
//     queryParams: { postId: null },
//     queryParamsHandling: 'merge'
//   });
// }

  private readonly postsService =inject(PostsService)

  // allposts:WritableSignal<Iposts[]>=signal([])

  allposts = this.postsService.allPosts;

  loggedInUserData:WritableSignal<IUserData>=signal({} as IUserData)

  ngOnInit():void{
    this.getAllPosts()
    this.saveUserData()
  }

  getAllPosts(){
    this.postsService.getAllPosta().subscribe({
      next: (res) => {
        // this.allposts.set(res.data.posts)
        this.postsService.allPosts.set(res.data.posts);
        console.log(this.allposts());
        
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  saveUserData(): void {
    this.loggedInUserData.set(JSON.parse(localStorage.getItem('socialUser')!));
    console.log(this.loggedInUserData());
  }

  deletePost(postId :string): void{
    this.postsService.deletePost(postId).subscribe({
      next: (res) => {
        this.getAllPosts()
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
