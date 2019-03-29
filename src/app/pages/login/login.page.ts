import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {AppConfig} from "../../model/appconfig";
import { AlertController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    params = {
        username: '',
        password: '',
    }
    result: number;
  constructor(private http: HttpClient,
              private router: Router,
              private alertController: AlertController) { }

  ngOnInit() {
  }
  async onLogin(form: NgForm) {
    await this.http.post(AppConfig.getDebugUrl() + '/login', {
        'accountNumber': this.params.username, 'loginPassword': this.params.password
    }).toPromise().then((response: any) => {
        this.result = response;
    });
    if (this.result) {
        this.router.navigateByUrl('\menu');
    } else {
        const alert1 = await this.alertController.create({
            message: '账号密码输入错误',
            buttons: ['好的']
        });
        return await alert1.present();
    }
  }

}
