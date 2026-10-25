import { AuthService } from './../../core/auth/services/auth/auth.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { IUserData } from '../../core/models/iposts.interface';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit{
  private readonly authService = inject(AuthService)

  loggedInUserData:WritableSignal<IUserData>=signal({} as IUserData)
  ngOnInit(): void {
    initFlowbite();
    this.saveUserData()
  }
  
  navbarlogout(){
    this.authService.logout()
  }

    saveUserData(): void {
    this.loggedInUserData.set(JSON.parse(localStorage.getItem('socialUser')!));
    console.log(this.loggedInUserData());
}
}
