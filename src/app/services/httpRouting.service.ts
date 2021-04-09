// service which is used to do routing operations.
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
/**
 * Class service which is used to do routing operations.
 */
@Injectable()
export class HttpRoutingService {
  /**
   * Variable which define the database's api url.
   * {string}
   */
  apiUrl = environment.apiUrldb;
  /**
   * Variable which define the host's url.
   *  {string}
   */
  hostUrl = environment.hostUrlDb;
  /**
   * Constructor  which is used to inject services.
   * @param httpClient Service to send the api request to the server.
   */
  constructor(private httpClient: HttpClient) { }
  /**
   * Method Which is used to send the get api request to the server
   * @param url Define api request url
   */
  // tslint:disable-next-line: typedef
  getMethod(url: string, queryParams?: any) {
    return this.httpClient.get(this.apiUrl + url, { params: queryParams });
  }
  /**
   * Method Which is used to send the post api request to the server
   * @param url Define api request url
   * @param data Define the data
   */
  // tslint:disable-next-line: typedef
  postMethod(url: string, data: any, queryParams?: any) {
    console.log(this.apiUrl + url, data, { params: queryParams });
    return this.httpClient.post(this.apiUrl + url, data, { params: queryParams });
  }
  /**
   * Method Which is used to get local json data
   * @param url Define request url
   */
  // tslint:disable-next-line: typedef
  getJsonData(url: string) {
    return this.httpClient.get(this.hostUrl + url);
  }
}
