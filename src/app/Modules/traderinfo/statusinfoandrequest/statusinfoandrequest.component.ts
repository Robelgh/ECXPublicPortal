import { Component,NgZone } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import { MapTo } from 'src/app/service/map.service';
import { MCRService } from 'src/app/service/MCR.service';

@Component({
  templateUrl: './statusinfoandrequest.component.html',

})
export class StatusinfoandrequestComponent {

  constructor(
    private authService:AuthService,
    private mapto:MapTo,
    private mcrservice:MCRService,
    private ngzone:NgZone
  ){}

  dropdownItems = [
    { name: 'GRN', code: 'GRN' ,value:0,controller:'grn'},
    { name: 'WHR', code: 'WHR' , value:1, controller:'whr'},
    { name: 'PSA', code: 'PSA' ,value:2, controller: 'psa'}
];

  selectedState: any = null;
  selectedController:any;
  selectedType: any;
  statusModel:any = {};
  WarehouseStatus:any={};

  Client:any=[];
  Whrbygrnstatus:any=[];
  tradedStatus:any=[];
 

  checked: boolean = true;
  showClient:boolean=true;

  formGroup: FormGroup | undefined;

  ngOnInit() {
 
    this.mcrservice.getMemberClient(this.authService.getMemberId()).then((data)=>
    {
          this.Client= data
    })
  }
 
  save(){
    this.mcrservice.checkstatus(this.selectedController,"5b330a1b-eaf2-42c9-b27c-56ab77bb8bcf",this.statusModel.data).then((x)=>{
    if(x.length){
      this.ngzone.run(()=>{
        this.WarehouseStatus=x[0]
        this.mcrservice.checkwhrbygrn(this.statusModel.data).then((y)=>{
          this.Whrbygrnstatus=y
            if(this.Whrbygrnstatus.length){
                const promises = this.Whrbygrnstatus.map((status) => {
                  return this.mcrservice.checktradestatusbywhr(status.whr);
              });
              
              Promise.all(promises)
              .then((results) => {
                console.log(results)
                this.tradedStatus=results
              })
              .catch((error) => {
                console.error("Error occurred while fetching trade status:", error);
              });
              
            }
        })
       })
    }
    })
   
  }

  onTypeChange(event: any) {
    this.statusModel={}
   this.selectedType=event.value.value
   this.selectedController=event.value.controller
  }
 


}
