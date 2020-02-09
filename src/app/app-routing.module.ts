import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo} from '@angular/fire/auth-guard';

// const redirectUnauthorized = () => redirectUnauthorizedTo(['auth/signin']);
// const redirectLoggedIn = () => redirectLoggedInTo(['/']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/login/login.module').then(m => m.LoginPageModule),
      // canActivate: [AngularFireAuthGuard],
      // data: {authGuardPipe: redirectUnauthorized},
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'top-user',
    loadChildren: () => import('./pages/user/top-user/top-user.module').then( m => m.TopUserPageModule)
  },
  {
    path: 'top-guardian',
    loadChildren: () => import('./pages/guardian/top-guardian/top-guardian.module').then( m => m.TopGuardianPageModule)
  },
  {
    path: 'terms-of-service',
    loadChildren: () => import('./pages/terms-of-service/terms-of-service.module').then( m => m.TermsOfServicePageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/user/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'talk',
    loadChildren: () => import('./pages/user/talk/talk.module').then( m => m.TalkPageModule)
  },
  {
    path: 'approval-list',
    loadChildren: () => import('./pages/guardian/approval-list/approval-list.module').then( m => m.ApprovalListPageModule)
  },
  {
    path: 'add-photo',
    loadChildren: () => import('./pages/guardian/add-photo/add-photo.module').then( m => m.AddPhotoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
