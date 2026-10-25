import { Component, inject, input, InputSignal, OnInit, signal, WritableSignal } from '@angular/core';
import { PostsService } from '../../../core/services/posts/posts.service';
import { Icomments } from '../../../core/models/icomments.interface';
import { IUserData } from '../../../core/models/iposts.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-comments',
  imports: [ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent implements OnInit {

  private readonly postsService = inject (PostsService)

  postId :InputSignal<string>=input.required()

  postCommemts:WritableSignal<Icomments[]> =signal([])

  loggedInUserData:WritableSignal<IUserData>=signal({} as IUserData)

  showOptions = signal<string | null>(null);
  
  // 2. body
  bodyInput = new FormControl('')

  ngOnInit(): void {
    this.getPostComments()
    this.saveUserData()
  }

  getPostComments(){
    this.postsService.getPostComments(this.postId()).subscribe({
      next: (res) => {
        this.postCommemts.set(res.data.comments)
        console.error(this.postCommemts());
      },
      error: (err) => {
        console.error(err);
        console.log('omnia');

      }
    });
  }

  saveUserData(): void {
    this.loggedInUserData.set(JSON.parse(localStorage.getItem('socialUser')!));
    console.log(this.loggedInUserData());
  }

  submitCreate() {
  if (!this.bodyInput.value?.trim()) {
    return;
  }

  const myForm = new FormData();

  myForm.append('content', this.bodyInput.value.trim());

  this.postsService.createComment(this.postId(), myForm).subscribe({
    next: (res) => {
      console.log(res);

      this.bodyInput.reset();
      this.getPostComments();
    },
    error: (err) => {
      console.error(err.error);
    }
  });
  }
deleteComment(commentId: string): void {
  this.postsService.deleteComment(this.postId(), commentId).subscribe({
    next: (res) => {
      console.log(res);
      this.getPostComments();
      this.showOptions.set(null);
    },
    error: (err) => {
      console.error(err);
    }
  });
}
}
