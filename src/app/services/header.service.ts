import { BehaviorSubject } from 'rxjs';

/**
 * Class service which is used to set,get and clear the headers for specific url request.
 */
export class HeaderService {
  /**
   * Variable which is used to store the user details.
   */
   user = new BehaviorSubject<any>(null);
  /**
   * Variable which is used to define the header for url.
   */
  headers: { [url: string]: { [key: string]: string } } = {};
  /**
   * Method which is used to set the headers for the given url.
   */
  // tslint:disable-next-line: typedef
  public setHeaders(url: string, key: string, value: string) {
    // To check the headers have given url as property
    if (this.headers && this.headers.hasOwnProperty(url)) {
      this.headers[url][key] = value;
    } else {
      this.headers[url] = { [key]: value };
    }
  }
  /**
   * Method which is used to clear the headers for the given url.
   *  url {string} To define the url.
   * key {string} To define the  key.
   *  {string}
   */
  public clearHeaders(url: string, key: string): string {
    // To check the headers have given url as property and key
    if (this.headers && this.headers.hasOwnProperty(url) && this.headers[url].hasOwnProperty(key)) {
      const val = this.headers[url][key];
      delete this.headers[url];
      return val;
    }
  }
  /**
   * Method which is used to get the headers for the given url.
   */
  // tslint:disable-next-line: typedef
  public getHeaders(url: string) {
    // To check the headers have given url as property
    if (this.headers && this.headers.hasOwnProperty(url)) {
      return this.headers[url];
    } else {
      // tslint:disable-next-line: no-string-literal
      return this.headers['default'];
    }
  }
  // tslint:disable-next-line: typedef
  refreshToken(){
    return true;
  }
  /**
   * Method which is used to check headers are exist for the given url or not.
   */
  // tslint:disable-next-line: typedef
  public verifyHeader(url: string, key: string) {
    // To check the headers have given url as property
    if (this.headers && this.headers.hasOwnProperty(url) && this.headers[url].hasOwnProperty(key)) {
      return true;
    } else {
      return false;
    }
  }
}
