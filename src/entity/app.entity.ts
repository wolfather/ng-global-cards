import { InvestmentEntity } from "./investment.entity";
import { ModInvestmentEntity } from "./mod.investment.entity";

export interface AppEntity {
    investment: ModInvestmentEntity;
}