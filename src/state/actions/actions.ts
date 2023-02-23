import { createAction, props } from "@ngrx/store";
import { InvestmentEntity } from "src/entity/investment.entity";
import { ACTION_TYPES } from "../actiontypes/types";


export const ACTIONS = {
    investments: {
        loadingInvestments: createAction(
            ACTION_TYPES.LOADING_INVESTMENTS_LIST,
        ),
        setInvestmentsSuccess: createAction(
            ACTION_TYPES.LOADING_INVESTMENTS_LIST_SUCCESS,
            props<{payload: InvestmentEntity[]}>()
        ),
        loadingInvestmentsSuccess: createAction(
            ACTION_TYPES.LOADING_INVESTMENTS_LIST_SUCCESS,
            props<{payload: InvestmentEntity[]}>()
        ),
        loadingInvestmentsError: createAction(
            ACTION_TYPES.LOADING_INVESTMENTS_LIST_ERROR,
            props<{error: string}>()
        ),
        setInvestmentSelected: createAction(
            ACTION_TYPES.SET_INVESTMENT_SELECTED,
            props<{payload: InvestmentEntity}>()
        ),

        loadingDetailInvestment: createAction(
            ACTION_TYPES.LOADING_DETAIL_INVESTMENT,
        ),
        getInvestmentSelected: createAction(
            ACTION_TYPES.GET_INVESTMENT_SELECTED,
            props<{id: string}>()
        )
    }
}
