import { InvestmentEntity } from "./investment.entity";

export interface ModInvestmentEntity {
    loading: boolean;
    errorMessage: string;
    investmentSelected: InvestmentEntity;
    investments: InvestmentEntity[];
}