import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {AppConfig} from "../../model/appconfig";
import { AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import {LocalStorageService} from "../../services/local-storage-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    user: any;
    params = {
        username: '',
        password: '',
    }
  constructor(private http: HttpClient,
              private router: Router,
              private alertController: AlertController,
              private localStorageService: LocalStorageService ) { }

  ngOnInit() {
  }
  async onLogin(form: NgForm) {
    let result = 0;
    let message = '';
    await this.http.post(AppConfig.getDebugUrl() + '/sys/login/restful', {
        'username': this.params.username, 'password': this.params.password
    }).toPromise().then((response) => {
        result = 1;
    }).catch(error => {

        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
        message = error.error.message;
    });
    if (result) {
        await this.http.get(AppConfig.getDebugUrl() + '/sys/login/current', {
        }).toPromise().then((response) => {
            this.user = response;
        });
        this.localStorageService.set('currentUser', this.user);
        this.router.navigateByUrl('\menu');
    } else {
        const alert1 = await this.alertController.create({
            message: message,
            buttons: ['好的']
        });
        return await alert1.present();
    }
  }

}
