import { Injectable } from '@angular/core';
import { HttpRoutingService } from './httpRouting.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor(private httpRoutingService: HttpRoutingService) { }
  // tslint:disable-next-line: typedef
  getDocumentList() {
    // tslint:disable-next-line: deprecation
   return  this.httpRoutingService.postMethod('v1/getDocList', { date: null });
  }
}
