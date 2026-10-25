import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IUserData } from '../../core/models/iposts.interface';

@Component({
  selector: 'app-left-sidebar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.css',
})
export class LeftSidebarComponent implements OnInit{

  loggedInUserData:WritableSignal<IUserData>=signal({} as IUserData)

  ngOnInit(): void {
    this.saveUserData();
  }

  saveUserData(): void {
    this.loggedInUserData.set(JSON.parse(localStorage.getItem('socialUser')!));
    console.log(this.loggedInUserData());
  }

}
