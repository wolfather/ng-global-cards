import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, map, of } from 'rxjs';
import { InvestmentEntity } from 'src/entity/investment.entity';
import { ModInvestmentEntity } from 'src/entity/mod.investment.entity';
import { ACTIONS } from 'src/state/actions/actions';

@Component({
  selector: 'app-investment-list',
  templateUrl: './investment-list.component.html',
  styleUrls: ['./investment-list.component.scss']
})
export class InvestmentListComponent implements OnInit, OnDestroy {
  public investments$: Observable<InvestmentEntity[]>;
  public isLoading$: Observable<boolean>;
  
  constructor(
    private readonly router: Router,
    private readonly store: Store<{investmentReducer: ModInvestmentEntity}>,
  ) {}

  ngOnInit() {
    this.store.dispatch(ACTIONS.investments.loadingInvestments())
    
    this.investments$ = this.store
      .pipe(select('investmentReducer'))
      .pipe(map(investmentReducer => investmentReducer.investments));
  }

  ngOnDestroy(): void {
    // this.investments$ = of([]);
  }

  trackByInvestmentId(index: number, investment: InvestmentEntity): string {
    return investment.id;
  }

  navigateTo(investment: InvestmentEntity): void {
    console.log({investment})
    this.store.dispatch(ACTIONS.investments.setInvestmentSelected({payload: investment}));
    this.router.navigateByUrl(`/details/${investment.id}`);
  }
}
