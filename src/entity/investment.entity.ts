import { StockEntity } from "./stock.entity";

export interface InvestmentEntity {
    id: string;
    nome: string;
    objetivo: string;
    saldoTotal: number;
    indicadorCarencia: 'N' | 'S';
    acoes: StockEntity[];
}