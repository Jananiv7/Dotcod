import { Component, OnInit } from '@angular/core';
import { DocumentsService } from 'src/app/services/documents.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  public isExpanded = false;
  documents = [];
  constructor(private documentService: DocumentsService) { }

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.documentService.getDocumentList().subscribe(res=>{
    // tslint:disable-next-line: no-string-literal
    this.documents = res['doclist'];
    });
  }
 

  // tslint:disable-next-line: typedef
  public toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }

}
