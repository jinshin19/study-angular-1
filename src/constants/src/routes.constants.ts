import { Routes } from '@angular/router';
import { Learning } from '../../app/learning/learning';
import { Sample } from '../../app/sample/sample';

export const RoutesC: Routes = [
  {
    data: { name: '' },
    path: 'learning',
    component: Learning,
    pathMatch: 'full',
  },
  {
    data: { name: 'Sample' },
    path: 'sample',
    component: Sample,
  },
  { path: '**', redirectTo: 'learning' },
];
