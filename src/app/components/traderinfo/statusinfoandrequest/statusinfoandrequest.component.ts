import { Component } from '@angular/core';

@Component({
  templateUrl: './statusinfoandrequest.component.html',

})
export class StatusinfoandrequestComponent {

  selectedState: any = null;

 

  dropdownItems = [
      { name: 'GRN', code: 'GRN' },
      { name: 'WHR', code: 'WHR' },
      { name: 'PSA', code: 'PSA' }
  ];


}
