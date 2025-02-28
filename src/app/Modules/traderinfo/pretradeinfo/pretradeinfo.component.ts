import { Component, OnInit,NgZone } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { MarketDataService } from 'src/app/service/marketdata.service';


import { Table } from 'primeng/table';


import jsPDF from "jspdf";
import "jspdf-autotable";


interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  templateUrl: './pretradeinfo.component.html',
})


export class PretradeinfoComponent {

  constructor(
    private marketdataService:MarketDataService,
    private ngzone:NgZone
  ){}


  coffeeOptionShow:boolean=false;
  isLocal:Number;
  showLocal:boolean=false;
  selectedCommodity: string="Coffee";
  filteredCommodities: any[] | undefined;
  pretradeCoffe:any[];
  orginalPretradeNonCoffee:any[];
  pretradeNonCoffee:any[];
  commodity:any[]
  selectedCommodityAdvanced: any[] = [];
  items: MenuItem[] | undefined;

  colsExport: any[];
  colsLocal: any[];
  colsTraceable: any[];
  colsNonCoffee: any[];

  _selectedColumns: any[];
  exportColumns;

  pdfButtonShow: boolean=false;
  activeItem: MenuItem | undefined;
  actionType:any=3;   // export=0 ,local =1 ,non-traceable=2,noncoffee=3 
  bodyFont:any=5;
  headFont:any=4;

  ngOnInit() {

    this.colsExport = [
      { field: "sessionName", header: "Session Name" },
      { field: "warehouseRecieptId", header: "SWHR" },
      { field: "grnNumber", header: "GRNNumber" },
      { field: "symbol", header: "Symbol" },
      { field: "numberOfBags", header: "#ofBags" },
      { field: "warehouse", header: "Warehouse" },
      { field: "productionYear", header: "PY" },
      { field: "rawValue", header: "Raw Value" },
      { field: "cupValue", header: "Cup Value" },
      { field: "totalValue", header: "Total Value" },
      { field: "uss", header: "USS" },
      { field: "moisture", header: "Moisture" },
      { field: "fullName", header: "Owner's Name" },
      { field: "woreda", header: "Woreda Name" },
      { field: "washingStation", header: "Washing Station" },
      { field: "ct", header: "CT" },
      { field: "certificate", header: "Certificate" },
      { field: "vattot", header: "VAT/TOT" },
      ];

    this.colsLocal = [
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

    this.colsTraceable = [
          { field: "sessionName", header: "Session Name " },
          { field: "warehouseRecieptId", header: "SWHR" },
          { field: "grnNumber", header: "GRNNumber" },
          { field: "symbol", header: "Symbol" },
          { field: "numberOfBags", header: "#ofBags" },
          { field: "warehouse", header: "Warehouse" },
          { field: "productionYear", header: "PY" },
          { field: "soundBean", header: "SBV" },
          { field: "pdv", header: "PDV" },
          { field: "sdv", header: "SDV" },
          { field: "totalValue", header: "TRV" },
          { field: "moisture", header: "Moisture" },
          { field: "fullName", header: "OwnerName" },
          { field: "Woreda", header: "Woreda" },
          { field: "washingStation", header: "WashingStation" },
          { field: "vattot", header: "VAT/TOT" },
    
          ];
    this.colsNonCoffee = [
        { field: "warehouseRecieptId", header: "SWHR" },
        { field: "commodityType", header: "Commodity Type" },
        { field: "symbol", header: "Symbol" },
        { field: "warehouse", header: "Warehouse" },
        { field: "productionYear", header: "Production Year" },
        { field: "quantity", header: "Quantity In Quintal" },
 
       ];
    this.setColsHeader()

 
      this.items = [
          { label: 'Non-Coffee', icon: 'pi pi-home' },
          { label: 'Coffee', icon: 'pi pi-chart-line' },
      ];

      this.marketdataService.getCommodities().then((com:any) =>
        {
            this.commodity=com
            this.selectedCommodityAdvanced =  this.commodity.find(item => item.commodityId === "71604275-df23-4449-9dae-36501b14cc3b");
            this.coffeeOptionShow = true;
        })
       

      this.activeItem = this.items[0];
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
    this.filteredCommodities = filtered;
}

  onActiveItemChange(event: MenuItem) {
      this.activeItem = event;
  }

  onCommoditySelect(selectedItem: any) {
       if (this.isJSON(selectedItem)) {
        this.pretradeCoffe=[];
        this.pretradeNonCoffee=[]
        this.ngzone.run(()=>
        {
          if(selectedItem.engName === "Coffee"){
            this.coffeeOptionShow = true;
          }
          else{
            this.actionType=3;
            this.coffeeOptionShow=false;
            this.marketdataService.getNonCoffeePretrade(selectedItem.commodityId).then((info) => {
              this.pretradeNonCoffee=info
              if(this.pretradeNonCoffee.length > 0){this.pdfButtonShow=true}
              else{this.pdfButtonShow=false}
             }) 
          }
        })
        }
  }

  isJSON(item: any): boolean {
    return typeof item === 'object' && item !== null;
  }

  onSelectionChange() {
    this.ngzone.run(()=>{
      if(this.isLocal == 2)
      {
        this.actionType=2
        this.marketdataService.getNonTraceableCoffeePretrade().then((x)=>{ 
          this.pretradeCoffe=x;
          if(this.pretradeCoffe.length > 0 ){this.pdfButtonShow=true}
          else{this.pdfButtonShow=false}
     })
      }
      else{
        this.marketdataService.getCoffeePretrade(this.isLocal).then((x)=>{ 
          this.pretradeCoffe=x;
          if(this.pretradeCoffe.length > 0){this.pdfButtonShow=true}
          else{this.pdfButtonShow=false}
          (this.isLocal.toString() === "1")? (this.showLocal=true, this.actionType=1) : (this.showLocal=false,this.actionType=0)
     })
      }
    })
       
  }
 
clear(table: Table) {
  table.clear();
}

 exportPdf() {
        this.setColsHeader()
        console.log(this.pretradeCoffe)
        const date = new Date(this.pretradeCoffe[0].tradeDate); 
        const doc = new jsPDF('p', 'pt');

        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        
        var imgUrl = './assets/demo/images/login/ECXLogoName.jpg'; 
     
        const imgX = 40; 
        const imgY = 20; 
        const imgWidth = 50; 
        const imgHeight = 50;

        var watermarkUrl = './assets/demo/images/login/ECXLogo.jpg'; 
        const imgWidth2 = doc.internal.pageSize.width - 80;
        const imgHeight2 = doc.internal.pageSize.height; 

        const imgX2 = 40; 
        const imgY2 = 125; 

        try {
            
        doc.addImage(imgUrl, 'JPEG', imgX, imgY, imgWidth, imgHeight);
        } catch (error) {
            console.log(error)
        }

       doc.text('Ethiopian Commodity Exchange (ECX)', 120, 30);
       doc.text('Daily Commodity Trade Data', 120, 50);
       doc.text('Date: ' + formattedDate, 120, 70); 
       doc.setFont("times", "normal"); 
       doc.setFontSize(8); 
   
       doc.text('Currency: ETB, Volume: Feresula for Coffee and Quintal for other, 1 Quintal = 100kg, 1 Feresula = 17kg ',200, 90);
   
        const startY = 100; 
        const startY2 = 400; 
    
        doc['autoTable'](this.exportColumns, this.pretradeCoffe, {
            headStyles: {
                fillColor:  '#fbb044',
                textColor: '#000000', 
                fontSize: this.headFont
            },
            bodyStyles: {
                fillColor: null, 
                textColor: '#000000', 
                fontSize: this.bodyFont
            },
            alternateRowStyles: {
              fillColor: '#f2f2f2' 
          },
          startY: startY, 
          margin: { top: 50 }, 
          rowStyles: (row, index) => {
  
              if (index % 2 === 0) {
                  row.styles.fillColor = '#ffffff';
              } else {
                  row.styles.fillColor = '#f2f2f2'; 
              }
          }
        });

        const totalPages = doc.internal.pages.length; 
        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i); 
            doc.addImage(watermarkUrl, 'JPEG', imgX2, imgY2, imgWidth2, imgHeight2); 
        }

        doc.save("pretrade.pdf");
    }

    setColsHeader(){

      if(this.actionType == 0){
        this._selectedColumns = this.colsExport;
        this.bodyFont=5;
        this.headFont=4;
        this.exportColumns = this.colsExport.map(col => ({
        title: col.header,
        dataKey: col.field
        }));
      }
      else if(this.actionType == 1){
        this._selectedColumns = this.colsLocal;
        this.bodyFont=6;
        this.headFont=6;
        this.exportColumns = this.colsLocal.map(col => ({
        title: col.header,
        dataKey: col.field,
        }));
      }
      else if(this.actionType == 2){
        this._selectedColumns = this.colsTraceable;
        this.exportColumns = this.colsTraceable.map(col => ({
        title: col.header,
        dataKey: col.field
        }));
      }
      else if(this.actionType == 3){
        this._selectedColumns = this.colsNonCoffee;
        this.exportColumns = this.colsNonCoffee.map(col => ({
        title: col.header,
        dataKey: col.field
        }));
      }



    }

}
