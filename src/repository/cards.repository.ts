import { Observable, map } from "rxjs";
import { InvestmentEntity } from "src/entity/investment.entity";
import { HttpClient } from '@angular/common/http';
import { ENDPOINT } from "src/config/config";
import { Injectable } from "@angular/core";
import * as uuid from 'uuid';


@Injectable()
export class CardsRepository {
    constructor(private readonly http: HttpClient) {}

    public getCards(): Observable<InvestmentEntity[]> {
        return this.http.get(ENDPOINT)
            .pipe(
                map((response: any) => {
                    const {status, data} = response.response;
                    if(status === '200') {
                        const transformedData = data.listaInvestimentos.map((investment: InvestmentEntity) => (
                            {...investment, id: uuid.v4()}
                        ))
                        return transformedData;
                    }
                    return []
                })
            );
    }
}
