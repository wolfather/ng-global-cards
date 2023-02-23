import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InvestmentsEffect } from 'src/state/effects/investments';
import { investmentReducer } from 'src/state/reducers/investment';
import { InvestmentListComponent } from './investment-list.component';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(
            'investmentReducer', 
            investmentReducer
        ),
        EffectsModule.forFeature([
            InvestmentsEffect,
        ]),
    ],
    declarations: [
        InvestmentListComponent
    ]
})
export class InvestmentListModule {}