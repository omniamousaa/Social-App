import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { PostsComponent } from './posts/posts.component';
import { StoriesComponent } from './stories/stories.component';
import { CreateComponent } from './create/create.component';

@Component({
  selector: 'app-feed',
  imports: [NavbarComponent, PostsComponent, StoriesComponent, CreateComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent {

}
