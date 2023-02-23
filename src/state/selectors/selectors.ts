import { createSelector } from "@ngrx/store";
import { ModInvestmentEntity } from "src/entity/mod.investment.entity";

export const selectInvestmentsFeature = (state: ModInvestmentEntity) => state;

export const loadingInvestmentsSelector = createSelector(
    selectInvestmentsFeature,
    (state) => state.loading
)

export const investmentsSucessSelector = createSelector(
    selectInvestmentsFeature,
    (state) => state.investments
)
export const investmentsErrorSelector = createSelector(
    selectInvestmentsFeature,
    (state) => state.errorMessage
)

export const selectInvestmentSelected = createSelector(
    selectInvestmentsFeature,
    (state) => state.investmentSelected
)

// export const selectLoadingError = createSelector(
//     selectInvestmentsFeature,
//     (state) => state.errorMessage
// )