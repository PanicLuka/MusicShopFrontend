import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreditCard } from '../models/credit-card';
import { DestinationAddress } from '../models/destination-address';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  URL = environment.musicShop_URL;
  constructor(private httpClient: HttpClient) { }

  public createCreditCard(card: CreditCard): Observable<CreditCard> {
    return this.httpClient.post<CreditCard>(`${this.URL}/api/creditCards`, card);
  }




}


