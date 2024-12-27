import { Component,NgZone } from '@angular/core';
import { ComplainFeedBackService } from 'src/app/demo/service/complainFeedBack..service.';
import { MapTo } from 'src/app/demo/service/map.service';

@Component({
  templateUrl: './complainandfeedback.component.html',

})
export class ComplainandfeedbackComponent {

  constructor(
    private service:ComplainFeedBackService,
    private mapto:MapTo,
    private ngzone:NgZone
  ){}

  selectedState: any = null;

 complainModel:any = {};
 complains:any=[];

  dropdownItems = [
      { name: 'GRN', code: 'GRN' },
      { name: 'WHR', code: 'WHR' },
      { name: 'PSA', code: 'PSA' }
  ];


 ngOnInit(): void {
  this.ngzone.run(()=>{
    this.populate()
    })
        ;
      }

  populate(){
    this.service.getFeedBack().then((x)=>{
      this.ngzone.run(()=>{
        this.complains=x.data
      })
     })
  }

  save(){
    this.complainModel.id="00000000-0000-0000-0000-000000000000";
    this.complainModel.CreatedBy="robel"
    console.log(this.mapto.convertJsonToFormData(this.complainModel))
    this.service.addFeedBack(this.mapto.convertJsonToFormData(this.complainModel)).then((x)=>{
    if(x.success){
      this.ngzone.run(()=>{
        this.populate()
       })
    }
    })
   
  }

}
