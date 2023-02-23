import { createReducer, on } from "@ngrx/store";
import { InvestmentEntity } from "src/entity/investment.entity";
import { ACTIONS } from "../actions/actions";
import { ModInvestmentEntity } from "src/entity/mod.investment.entity";


export const initialData: ModInvestmentEntity = {
    loading: false,
    errorMessage: '',
    investmentSelected: {} as InvestmentEntity,
    investments: [] as InvestmentEntity[],
};

export const investmentReducer = createReducer(
    initialData,
    on(ACTIONS.investments.loadingInvestments, (state) => ({
        ...state, 
        loading: true
    })),
    on(ACTIONS.investments.loadingInvestmentsSuccess, (state, action) => ({
        ...state,
        loading: false,
        investments: action.payload
    })),
    on(ACTIONS.investments.setInvestmentsSuccess, (state, action) => ({
        ...state,
        loading: false,
        investments: action.payload
    })),
    on(ACTIONS.investments.loadingInvestmentsError, (state, action) => ({
        ...state,
        loading: false,
        errorMessage: action.error
    })),
    on(ACTIONS.investments.setInvestmentSelected, (state, action) => ({
        ...state,
        investment: action.payload
    })),
    on(ACTIONS.investments.getInvestmentSelected, (state, action) => ({
        ...state,
        investmentSelected: (
            state.investments.find(investment => (
                investment.id === action.id
            )) as InvestmentEntity
        )
    }))
);
