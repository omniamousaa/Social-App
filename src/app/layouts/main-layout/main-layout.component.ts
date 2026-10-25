import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth/auth.service';
import { initFlowbite } from 'flowbite';
import { NavbarComponent } from '../../features/navbar/navbar.component';
import { LeftSidebarComponent } from '../../layout/left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from '../../layout/right-sidebar/right-sidebar.component';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLink, NavbarComponent, LeftSidebarComponent, RightSidebarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent implements OnInit {
    private readonly authService = inject(AuthService)

    ngOnInit(): void {
    initFlowbite();
  }
  navbarlogout(){
    this.authService.logout()
  }
}
