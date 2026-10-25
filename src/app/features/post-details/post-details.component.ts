import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostsService } from '../../core/services/posts/posts.service';

@Component({
  selector: 'app-post-details',
  imports: [RouterLink],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent implements OnInit{

  private readonly activatedRoute = inject (ActivatedRoute)
  private readonly postsService = inject (PostsService)
  
  postId = signal('')
  postDetails = signal<any>(null);

  ngOnInit(): void {
    this.readDataFromUrl()
  }

  readDataFromUrl(){
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.postId.set(res.get('id')!)
        this.getPostDetails()
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getPostDetails(){
    this.postsService.getSinglePost(this.postId()).subscribe({
      next: (res) => {
        console.error(res);
        this.postDetails.set(res.data.post);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
