import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Query {
  limit?: number;
  order?: string;
  sort?: string;
  embed?: string;
  expand?: string;
}

export class RestService {
  base: string = 'http://localhost:3000';
  resource: string = '/';
  type: any;

  constructor(@Inject(HttpClient) private http: HttpClient) { }

  get url() {
    return this.base + this.resource;
  }

  query<T>(query?: Query) {
    let url = this.url;
    if (query) {
      url += `?${this.toQueryString(query)}`;
    }

    return this.http.get<T>(url);
  }

  get<T>(id: number) {
    return this.http.get<T>(this.url + '/' + id);
  }

  create<T>(body: any) {
    return this.http.post<T>(this.url, body);
  }

  update<T>(id: number, body: any) {
    return this.http.put<T>(this.url + '/' + id, body);
  }

  delete<T>(id: number) {
    return this.http.delete<T>(this.url + '/' + id);
  }

  private toQueryString(paramsObject) {
    return Object
      .keys(paramsObject)
      .map(key => `_${encodeURIComponent(key)}=${encodeURIComponent(paramsObject[key])}`)
      .join('&');
  }
}
