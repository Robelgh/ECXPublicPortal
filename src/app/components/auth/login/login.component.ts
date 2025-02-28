import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { MapTo } from 'src/app/service/map.service';

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

    valCheck: string[] = ['remember'];
    loginModel: any = {};
    password!: string;
    errorMessage:string=null;

    constructor(public layoutService: LayoutService,
                private authService:AuthService,
                private mapto:MapTo
    ) { }

   

    login(){
        this.authService.auth(this.loginModel).then(data => {
                if(data.success)
                {
                    this.authService.login(data)
                }
                else{
                this.errorMessage=data.message
                }
            });
       
    }
}
