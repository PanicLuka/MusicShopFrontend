import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DestinationAddress } from '../models/destination-address';

@Injectable({
  providedIn: 'root'
})
export class DestinationAddressService {

  URL = environment.musicShop_URL;
  constructor(private httpClient: HttpClient) { }


  public createDestinationAddress(destination: DestinationAddress): Observable<DestinationAddress> {
    return this.httpClient.post<DestinationAddress>(`${this.URL}/api/destinations`, destination);
  }
}
