import { Component,NgZone } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { MapTo } from 'src/app/service/map.service';
import { map, catchError } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    choosed:Number;
    TransactionID:String;
    AuthSteps:Number=0;
    valCheck: string[] = ['remember'];
    loginModel: any = {};
    validateModel:any = {};
    password!: string;
    errorMessage:string=null;
    filledOTP:string;
    AuthType:Number=0;

    formGroup!: FormGroup;

    categories: any[] = [
        { name: 'Accounting', key: 'A' },
        { name: 'Marketing', key: 'M' },
        { name: 'Production', key: 'P' },
        { name: 'Research', key: 'R' }
    ];

    constructor(public layoutService: LayoutService,
                private authService:AuthService,
                private mapto:MapTo,
                private ngzone:NgZone
    ) { }

    ngOnInit() {
        this.formGroup = new FormGroup({
            selectedCategory: new FormControl()
        });
    }

    login(){
        this.authService.auth(this.loginModel).then(data => {
                if(data.success)
                {
                    this.AuthSteps=1
                }
                else{
                this.errorMessage=data.message
                }
            });
       
    }

    onSelectionChange(value:number) {
        if(value==2){
            this.AuthSteps =3;
        }
        
      }
      onAUTHSelectionChange(value:Number){
        this.AuthType = value;
        this.AuthSteps=2
      }
      SendOtp(){
        this.ngzone.run(()=>{
        this.authService.sendOTP().then((response)=>{
           if(response.value){
            var data = JSON.parse(response.value)
            this.TransactionID=data.txId;
                this.AuthSteps=2
            
            
           }
        })
            //this.AuthSteps=2
        })
      }

      onOtpChange(event: any) {
        console.log('OTP input changed:', event);
        this.filledOTP=event
        // Do something with the event, for example, store it or process it
      }

      Verify(){
        if(this.AuthType==0)
        {
            this.validateModel.txId= this.TransactionID
            this.validateModel.token= this.filledOTP
            this.authService.verfiyOTP(this.validateModel).then((response)=>{
                if(response.success){
                    this.authService.login(response);
                }
                else{
                    this.errorMessage="Wrong OTP"
                }
            })
        }
        else{
            if(this.AuthType === 1)
                this.validateModel.authType= "GOOGLE AUTHENTICATOR";
            else if(this.AuthType === 2)
                this.validateModel.authType= "MICROSOFT AUTHENTICATOR";
            else if(this.AuthType === 3)
                this.validateModel.authType= "MINIORANGE AUTHENTICATOR";
            this.validateModel.token= this.filledOTP;
            this.validateModel.customerKey="";
            this.validateModel.username= "behailu.girma@ecx.com.et";
            this.authService.VerifyOTPAUTH(this.validateModel).then((response)=>{
                if(response.success){
                    this.authService.login(response);
                }
                else{
                    this.errorMessage="Wrong OTP"
                }
            })
        }
      }
}
