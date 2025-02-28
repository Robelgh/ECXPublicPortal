import { Component,ViewChild,Input, OnInit, PLATFORM_ID, ChangeDetectorRef, inject, effect } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { MarketDataService } from '../../../service/marketdata.service';
import { PdfExportComponent } from 'src/app/shared/pdf-export/pdf-export.component';

import jsPDF from "jspdf";
import "jspdf-autotable";

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
  selector: 'app-dailytradedata',
  templateUrl: './dailytradedata.component.html',

})
export class DailytradedataComponent {

    @ViewChild(PdfExportComponent) tableComponent!: PdfExportComponent; 

    items!:any[];
    customers!: any[];
    commodity:any[];
    representatives!: any[];
    filteredCountries: any[] | undefined;
    statuses!: any[];
    products!: any[];
    loading: boolean = true;
    selectedCommodityAdvanced: any[] = [];
    activityValues: number[] = [0, 100];
    selectedCommodity: string="Coffee";
    selectedTab: number=0;
    pdfButtonShow: boolean=false;

    cols: any[];

    _selectedColumns: any[];
    exportColumns;
    
    constructor(
                private marketDataService:MarketDataService) {}
    
      ngOnInit() {

            this.cols = [
            { field: "commodity", header: "Commodity Type" },
            { field: "symbol", header: "Symbol" },
            { field: "warehouseCode", header: "WH" },
            { field: "productionYear", header: "P.Year" },
            { field: "previousClosing", header: "Prev. Close" },
            { field: "closingPrice", header: "Close" },
            { field: "change", header: "Difference" },
            { field: "dayHigh", header: "Day High" },
            { field: "dayLow", header: "Day Low" },
            { field: "volumeInLot", header: "Volume" }
     
            ];

            this._selectedColumns = this.cols;
            this.exportColumns = this.cols.map(col => ({
            title: col.header,
            dataKey: col.field
            }));

          this.marketDataService.getCommodities().then(com =>
            {
                this.commodity=com
                this.selectedCommodityAdvanced =  this.commodity.find(item => item.commodityId === "71604275-df23-4449-9dae-36501b14cc3b");
                if(this.selectedCommodityAdvanced != null){
                    this.onCommoditySelect(this.selectedCommodityAdvanced) 
                    this.loading = false;
                }
            })
    
      }
    
      clear(table: any) {
          table.clear();
      }
    
      getSeverity(status: string) {
          switch (status.toLowerCase()) {
              case 'unqualified':
                  return 'danger';
    
              case 'qualified':
                  return 'success';
    
              case 'new':
                  return 'info';
    
              case 'negotiation':
                  return 'warning';
    
              default:
                  return '';
              
          }
      }

      filterCommodity(event: AutoCompleteCompleteEvent) {
        let filtered: any[] = [];
        let query = event.query;

        for (let i = 0; i < (this.commodity as any[]).length; i++) {
            let com = (this.commodity as any[])[i];
            if (com.symbol.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(com);
            }
        }

        this.filteredCountries = filtered;
    }

    onCommoditySelect(selectedItem: any) {

        if (this.isJSON(selectedItem)) {
           this.selectedCommodity=selectedItem.engName;
            this.marketDataService.getDailyTradeDate(selectedItem.commodityId).then((market => {
                this.products=market
                if(this.products.length > 0){this.pdfButtonShow=true}
                else{this.pdfButtonShow=false}
                if(this.selectedCommodity == "coffee"){
                       if(!this.selectedTab){

                       }
                }
            }))
        }

    }

    isJSON(item: any): boolean {
        return typeof item === 'object' && item !== null;
    }

    onTabChange(event: any): void {
         this.selectedTab= event.index
       // this.filterSessionsByDay(event.index)
    }

   


    @Input() get selectedColumns(): any[] {
        return this._selectedColumns;
      }
    
      set selectedColumns(val: any[]) {
        //restore original order
        this._selectedColumns = this.cols.filter(col => val.includes(col));
      }
    
      exportPdf() {
        const date = new Date(this.products[0].tradeDate); 
        const doc = new jsPDF('p', 'pt');

        
        // Format the date dynamically
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        
        var imgUrl = './assets/demo/images/login/ECXLogoName.jpg'; 
     
        const imgX = 40; 
        const imgY = 20; 
        const imgWidth = 50; 
        const imgHeight = 50;

        var watermarkUrl = './assets/demo/images/login/ECXLogo.jpg';  // The watermark image
        const imgWidth2 = doc.internal.pageSize.width - 80;
        const imgHeight2 = 500; // Full height of the page

        const imgX2 = 40; 
        const imgY2 = 105; 

        try {
            
        doc.addImage(imgUrl, 'JPEG', imgX, imgY, imgWidth, imgHeight);
        doc.addImage(watermarkUrl, 'JPEG', imgX2, imgY2, imgWidth2, imgHeight2);
        } catch (error) {
            console.log(error)
        }


        // Text elements including the dynamic date
       doc.text('Ethiopian Commodity Exchange (ECX)', 120, 30);
        doc.text('Daily Commodity Trade Data', 120, 50);
       doc.text('Date: ' + formattedDate, 120, 70); 
       doc.setFont("times", "normal"); // Set the font to Times, normal style
       doc.setFontSize(8); // Set the font size to 8 pt (smaller size)
   
       // Add text with smaller font size
       doc.text('Currency: ETB, Volume: Feresula for Coffee and Quintal for other, 1 Quintal = 100kg, 1 Feresula = 17kg ',200, 90);
   
        const startY = 100; // Adjust this value as needed to lower the table
        const startY2 = 400; 
    
        doc['autoTable'](this.exportColumns, this.products, {
            headStyles: {
                fillColor:  '#fbb044', // No background color for header
                textColor: '#000000', // Text color for header
            },
            bodyStyles: {
                fillColor: null, // No background color for body
                textColor: '#000000', // Text color for body rows
            },
            alternateRowStyles: {
                fillColor: null // Disable striped rows (remove the alternating row colors)
            },
            startY: startY // Set the starting Y position of the table
        });

        doc.save("products.pdf");
    }

      
}    


