import { Component, OnInit,  ViewChild, ViewEncapsulation } from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.page.html',
    styleUrls: ['./welcome.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class WelcomePage implements OnInit {

    constructor(private router: Router) { }
    showSkip: any = true;
    ngOnInit() {
    }
    startApplication() {
        this.router.navigateByUrl('\signup');
    }
}
