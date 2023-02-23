import { NO_ERRORS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CardsRepository } from 'src/repository/cards.repository';
import { InvestmentListComponent } from './components/investment-list/investment-list.component';
import { InvestmentDetailComponent } from './components/investment-detail/investment-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { StoreModule } from '@ngrx/store';
import { investmentReducer } from 'src/state/reducers/investment';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { InvestmentListModule } from './components/investment-list/investment-list.module';
import { ConvertpercentagetovaluePipe } from './pipes/convertpercentagetovalue.pipe';
import { InputallownumbersDirective } from './directive/inputallownumbers.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyPipe } from '@angular/common';
import { JoinstringPipe } from './pipes/joinstring.pipe';
import { CinputComponent } from './components/cinput/cinput.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    InvestmentDetailComponent,
    NotFoundComponent,
    ConvertpercentagetovaluePipe,
    InputallownumbersDirective,
    JoinstringPipe,
    CinputComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    EffectsModule.forRoot(),
    StoreModule.forRoot({
      'investmentReducer': investmentReducer
    }),
    StoreDevtoolsModule.instrument({
      logOnly: !isDevMode(),
      maxAge: 25,
      autoPause: true,
      features: {
        pause: false,
        lock: true,
        persist: true
      }
    }),
    InvestmentListModule,
    NgbModule,
  ],
  providers: [
    CardsRepository,
    ConvertpercentagetovaluePipe,
    JoinstringPipe,
    CurrencyPipe,
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
