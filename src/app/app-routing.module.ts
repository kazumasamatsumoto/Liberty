import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo} from '@angular/fire/auth-guard';

// const redirectUnauthorized = () => redirectUnauthorizedTo(['auth/signin']);
// const redirectLoggedIn = () => redirectLoggedInTo(['/']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./login/login.module').then(m => m.LoginPageModule),
      // canActivate: [AngularFireAuthGuard],
      // data: {authGuardPipe: redirectUnauthorized},
  },
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'top-user',
    loadChildren: () => import('./top/top-user/top-user.module').then( m => m.TopUserPageModule)
  },
  {
    path: 'top-guardian',
    loadChildren: () => import('./top/top-guardian/top-guardian.module').then( m => m.TopGuardianPageModule)
  },
  {
    path: 'terms-of-service',
    loadChildren: () => import('./terms-of-service/terms-of-service.module').then( m => m.TermsOfServicePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
