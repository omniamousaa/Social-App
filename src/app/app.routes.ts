import { alreadyLoggedGuard } from './core/auth/guards/already-logged-guard';
import { isAllowdAuthGuard } from './core/auth/guards/is-allowd-auth-guard';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { FeedComponent } from './features/feed/feed.component';
import { ProfileComponent } from './features/profile/profile.component';
import { NotificationsComponent } from './features/notifications/notifications.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { PostDetailsComponent } from './features/post-details/post-details.component';

export const routes: Routes = [
    {path:"",redirectTo:'login',pathMatch:'full'},
    {path : '',component:AuthLayoutComponent ,canActivate:[alreadyLoggedGuard] ,children:[
        {path:'login',component:LoginComponent},
        {path:'register',component:RegisterComponent}
    ]},
    {path :'',component:MainLayoutComponent ,canActivate:[isAllowdAuthGuard],children:[
        {path:'feed',component:FeedComponent},
        {path:'profile',component:ProfileComponent},
        {path:'notifications',component:NotificationsComponent},
        {path:'post-details/:id',component:PostDetailsComponent}
    ]},
    {path:'**',component:NotFoundComponent}
];