import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Campaign } from '../models/campaign.model';
import { PaginatedResult } from '../models/paginate.mode';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getCampaigns(): Observable<Campaign[]> {
    return this.http.get(`${this.url}/campaigns`) as Observable<Campaign[]>;
  }

  getCampaign(id: number): Observable<Campaign> {
    return this.http.get(`${this.url}/campaigns/${id}`) as Observable<Campaign>;
  }

  filterCampaign(filters: any): Observable<PaginatedResult<Campaign>> {
    // Add filters as query parameters
    let params = new HttpParams();
    for (let key in filters) {
      if (filters[key]) {
        params = params.append(key, filters[key]);
      }
    }

    return this.http.get(`${this.url}/campaigns/search`, {
      params,
    }) as Observable<PaginatedResult<Campaign>>;
  }
}
