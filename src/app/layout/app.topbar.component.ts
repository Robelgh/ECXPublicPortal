import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from '../service/auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, private http:HttpClient, private authService:AuthService) { }

    // redirectToSecondApp() {
    //     // 1. First call your backend to get an SSO token
    //     this.http.post('/api/generate-sso-token', {}).subscribe({
    //       next: (response: any) => {
    //         // 2. Create a hidden form to POST to the second app
    //         const form = document.createElement('form');
    //         form.method = 'POST';
    //         form.action = 'http://10.3.5.95:17023/api/validate-sso-token';
            
    //         const tokenInput = document.createElement('input');
    //         tokenInput.type = 'hidden';
    //         tokenInput.name = 'token';
    //         tokenInput.value = response.token;
            
    //         const usernameInput = document.createElement('input');
    //         usernameInput.type = 'hidden';
    //         usernameInput.name = 'username';
    //         usernameInput.value = response.username;
            
    //         form.appendChild(tokenInput);
    //         form.appendChild(usernameInput);
    //         document.body.appendChild(form);
    //         form.submit();
    //       },
    //       error: (err) => {
    //         console.error('SSO token generation failed', err);
    //       }
    //     });
    //   }

    redirectToSecondApp() {
        // Get the authentication token from your current session
        const token = this.authService.getToken(); 
        
        // Redirect to the second app with token as query parameter
        window.location.href = `http://10.3.5.95:17023/TraderUI/Index?authToken=${token}`;
    }
    logout()
    {
        this.authService.logOut();
    }
}
