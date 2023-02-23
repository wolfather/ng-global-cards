import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Actions } from '@ngrx/effects';
import { hot } from 'jasmine-marbles';
import { of, throwError } from 'rxjs';
import { InvestmentEntity } from 'src/entity/investment.entity';
import { ModInvestmentEntity } from 'src/entity/mod.investment.entity';
import { ACTIONS } from '../actions/actions';
import { ENDPOINT } from 'src/config/config';
import { InvestmentsEffect } from './investments';

describe('InvestmentsEffect', () => {
  let actions$: Actions;
  let httpClientSpy: { get: jasmine.Spy };
  let effect: InvestmentsEffect;
  const initialState = { investments: [] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        InvestmentsEffect,
        provideMockStore({ initialState }),
      ]
    });

    actions$ = TestBed.inject(Actions);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    effect = TestBed.inject(InvestmentsEffect);
  });

  describe('getInvestments', () => {
    it('should dispatch setInvestmentsSuccess action when successful', () => {
      // Arrange
      const investments: InvestmentEntity[] = [
        { id: '1', nome: 'Investment 1', objetivo: 'Obj 1', saldoTotal: 1000, indicadorCarencia: 'N', acoes: [] },
        { id: '2', nome: 'Investment 2', objetivo: 'Obj 2', saldoTotal: 2000, indicadorCarencia: 'N', acoes: [] },
      ];
      httpClientSpy.get.and.returnValue(of({ response: { status: 200, data: { listaInvestimentos: investments } } }));
      const expectedAction = ACTIONS.investments.setInvestmentsSuccess({ payload: investments });

      // Act
      const result$ = effect.getInvestments;

      // Assert
      expect(result$).toBeObservable(hot('(a|)', { a: expectedAction }));
      expect(httpClientSpy.get).toHaveBeenCalledWith(ENDPOINT);
    });

    it('should dispatch loadingInvestmentsError action when error', () => {
      // Arrange
      httpClientSpy.get.and.returnValue(throwError({ message: 'Server error' }));
      const expectedAction = ACTIONS.investments.loadingInvestmentsError({ error: 'Server error' });

      // Act
      const result$ = effect.getInvestments;

      // Assert
      expect(result$).toBeObservable(hot('(a|)', { a: expectedAction }));
      expect(httpClientSpy.get).toHaveBeenCalledWith(ENDPOINT);
    });
  });
});