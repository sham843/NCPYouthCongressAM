import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInAuthGuard } from './auth/logged-in-auth.guard';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { WebComponent } from './web/web.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '', component: WebComponent, children: [
      { path: 'home', loadChildren: () => import('./web/home/home.module').then(m => m.HomeModule), data: { title: 'Home' } },
      { path: 'about', loadChildren: () => import('./web/about/about.module').then(m => m.AboutModule), data: { title: 'About' } },
      { path: 'register', loadChildren: () => import('./web/register/register.module').then(m => m.RegisterModule), data: { title: 'Register' } },
      { path: 'login', loadChildren: () => import('./web/login/login.module').then(m => m.LoginModule), data: { title: 'Login' }, canActivate: [LoggedInAuthGuard] },
      { path: 'privacy-policy', loadChildren: () => import('./web/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule) },
      { path: 'share/:id', loadChildren: () => import('./web/share/share.module').then(m => m.ShareModule) },
      { path: 'events', loadChildren: () => import('./web/events/events.module').then(m => m.EventsModule) },
    ]
  },
  { path: '500', component: ServerErrorComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
