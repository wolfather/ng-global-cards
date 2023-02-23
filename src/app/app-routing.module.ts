import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvestmentDetailComponent } from 'src/app/components/investment-detail/investment-detail.component'
import { InvestmentListComponent } from 'src/app/components/investment-list/investment-list.component'
import { NotFoundComponent } from 'src/app/pages/not-found/not-found.component'

export const routes: Routes = [
  { path: 'investment-list', component: InvestmentListComponent },
  { path: 'details/:id',      component: InvestmentDetailComponent },
  {
    path: '',
    redirectTo: '/investment-list',
    pathMatch: 'full'
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
