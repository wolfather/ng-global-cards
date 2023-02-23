import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ACTIONS } from "../actions/actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ENDPOINT } from "src/config/config";
import * as uuid from 'uuid'
import { InvestmentEntity } from "src/entity/investment.entity";
import { Store } from "@ngrx/store";
import { ModInvestmentEntity } from "src/entity/mod.investment.entity";

@Injectable()
export class DetailInvestmentsEffect {

    getDetailInvestment = createEffect(() => 
        this.actions$.pipe(
            ofType(ACTIONS.investments.loadingDetailInvestment),
            switchMap(() => {
                return this.httpClient.get<InvestmentEntity[]>(ENDPOINT)
            }),
            map((response: any) => {
                const {status, data} = response.response;
                if(status === '200') {
                    const transformedData = data.listaInvestimentos
                        .map((investment: InvestmentEntity) => (
                            {...investment, id: uuid.v4()}
                        ))
                    return transformedData;
                }
                
                return of(ACTIONS.investments.loadingInvestmentsError({error: 'no investments'}));
            }),
            tap(investments => (
                this.store.dispatch(
                    ACTIONS.investments.setInvestmentsSuccess({payload: investments})
                )
            )),
            catchError(error =>
                of(ACTIONS.investments.loadingInvestmentsError({error: error.message}))
            )
        )
    );

    constructor(
        private readonly actions$: Actions,
        private readonly httpClient: HttpClient,
        private readonly store: Store<ModInvestmentEntity>,
    ) {}
}