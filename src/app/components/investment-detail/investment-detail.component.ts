import { CurrencyPipe } from '@angular/common';
import { AfterContentInit, AfterViewInit, Component, ElementRef, OnDestroy, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, map } from 'rxjs';
import { ConvertpercentagetovaluePipe } from 'src/app/pipes/convertpercentagetovalue.pipe';
import { InvestmentEntity } from 'src/entity/investment.entity';
import { ModInvestmentEntity } from 'src/entity/mod.investment.entity';
import { StockEntity } from 'src/entity/stock.entity';
import { ACTIONS } from 'src/state/actions/actions';
import { CinputComponent } from '../cinput/cinput.component';
import { JoinstringPipe } from 'src/app/pipes/joinstring.pipe';

@Component({
  selector: 'app-investment-detail',
  templateUrl: './investment-detail.component.html',
  styleUrls: ['./investment-detail.component.scss']
})
export class InvestmentDetailComponent implements AfterViewInit, AfterContentInit, OnDestroy {
  subscription = new Subscription()
  item$: Observable<InvestmentEntity>;
  stocks$: StockEntity[] = [];

  @ViewChildren(CinputComponent) stockInputs: QueryList<CinputComponent>;
  formRescue: FormGroup = new FormGroup({});

  constructor(
    private readonly router: ActivatedRoute,
    private readonly store: Store<{investmentReducer: ModInvestmentEntity}>,
    private readonly convertValue: ConvertpercentagetovaluePipe,
    private readonly currencyPipe: CurrencyPipe,
    private readonly joinString: JoinstringPipe,
  ) {}

  ngAfterViewInit(): void {
    this.stockInputs.forEach(inputs => {
      const formControlName = this.joinString.transform(inputs.dataStock);
      const formControlValue = this.currencyPipe.transform(inputs.value, 'BRL');

      this.formRescue.addControl(
        formControlName, 
        new FormControl(formControlValue, Validators.required));
    });
  }

  ngAfterContentInit() {
    this.subscription.add(this.router.paramMap
      .subscribe((res: ParamMap) => {
        this.store.dispatch(ACTIONS.investments.getInvestmentSelected({
          id: String(res.get('id'))
        }));
      })
    );

    this.item$ = this.store
      .pipe(select('investmentReducer'))
      .pipe(
        map(investmentReducer => {
          const {investmentSelected} = investmentReducer;
          return investmentSelected
        })
      );
  }

  submitRescueForm(): void {
    console.log(this.formRescue.value);
  }

  changeInputValue($event: any, total: any) {
    const parsedValue = this.currencyPipe.transform(this.convertValue.transform($event, total), 'BRL');

    return parsedValue;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
