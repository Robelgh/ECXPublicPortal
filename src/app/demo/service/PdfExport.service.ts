import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';


@Injectable({
  providedIn: 'root'
})
export class PdfExportService {

  exportTableToPdf() {
    const doc = new jsPDF();
    doc.text("Hello, this is your PDF!", 10, 10);
    doc.text("Click to print this document.", 10, 20);

    doc.save('document.pdf');
  }
}