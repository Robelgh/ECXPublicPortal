import { Component } from '@angular/core';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-pdf-export',
  templateUrl: './pdf-export.component.html',

})
export class PdfExportComponent {


  constructor() { }

  getContentToPrint(): string {
    // Return the content to be printed or shown in the print window
    return document.querySelector('.app-pdf-export')?.outerHTML || '';
  }
}
