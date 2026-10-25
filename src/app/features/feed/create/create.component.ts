import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { IUserData } from '../../../core/models/iposts.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PostsService } from '../../../core/services/posts/posts.service';

@Component({
  selector: 'app-create',
  imports: [ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent implements OnInit{

  private readonly postsService = inject (PostsService)

  loggedInUserData:WritableSignal<IUserData>=signal({} as IUserData)
  
  imgToDisplay:WritableSignal<string | ArrayBuffer | null | undefined> =signal(null)

  // 1. file
  selectedImg !: File

  // 2. body
  bodyInput = new FormControl('')

  // 2. Privcy
  privcyInput = new FormControl('public')


  ngOnInit(): void {
    this.saveUserData()
  }

  saveUserData(): void {
    this.loggedInUserData.set(JSON.parse(localStorage.getItem('socialUser')!));
    console.log(this.loggedInUserData());
  }

  selectImg(e: Event): void {
    if (e.target != null) {
      let target = e.target as HTMLInputElement
    if (target.files != null && target.files.length > 0) {
      this.selectedImg = target.files[0]
      console.log(this.selectedImg);
      this.readFile()
    }
  }
  }

  readFile(){
    // 1- take instance
    let fileReader = new FileReader()

    // 2- url to img by readAsDataURL
    fileReader.readAsDataURL(this.selectedImg)

    // 2-2 load
    fileReader.onload =(e:ProgressEvent<FileReader>)=>{
      this.imgToDisplay.set(e.target?.result)
    }

  }

  resetImg(){
    this.imgToDisplay.set(null)
  }

  submitCreate(e:SubmitEvent , form:HTMLFormElement){
    e.preventDefault()

    let myForm = new FormData()
    
    if (this.selectedImg) {
      myForm.append('image' , this.selectedImg)
    }
    if (this.bodyInput.value) {
      myForm.append('body' , this.bodyInput.value)
    }
    if (this.privcyInput.value) {
      myForm.append('privacy' , this.privcyInput.value)
    }
    
    this.postsService.createPost(myForm).subscribe({
    next: (res) => {
      console.error(res);



    this.postsService.getAllPosta().subscribe({
    next: (res) => {
    this.postsService.allPosts.set(res.data.posts);
  },


  error: (err) => console.error(err)
});

form.reset();
this.imgToDisplay.set(null);

    },
    error: (err) => {
      console.error(err.error);
    }
  });
  }

}
