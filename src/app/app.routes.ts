import { Routes } from '@angular/router';
import { LayoutComponent } from './Components/Layout/layout.component';
import { HomeComponent } from './Pages/home.component';
import { MoviesComponent } from './Pages/movies.component';
import { TvComponent } from './Pages/tv.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'movies',
        component: MoviesComponent,
      },
      {
        path: 'tv',
        component: TvComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
