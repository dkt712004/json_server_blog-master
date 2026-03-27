import { Routes } from '@angular/router';
import { BlogListComponent } from './components/blog-list/blog-list';
import { BlogCreateEditComponent } from './components/blog-create-edit/blog-create-edit';
import { BlogSearchComponent } from './components/blog-search/blog-search';

export const routes: Routes = [
  { path: 'blogs', component: BlogListComponent },
  { path: 'blogs/new', component: BlogCreateEditComponent },
  { path: 'blogs/edit/:id', component: BlogCreateEditComponent },
  { path: 'blogs/search', component: BlogSearchComponent },
];
