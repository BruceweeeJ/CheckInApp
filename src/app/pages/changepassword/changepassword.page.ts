import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ToastController, AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AppConfig} from '../../model/appconfig';
import {AuthenticationCodeService} from "../../services/authentication-code-service.service";
import {LocalStorageService} from "../../services/local-storage-service.service";

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {
    verifyCode: any = {
        verifyCodeTips: '获取验证码',
        totalTime: 60,
        disable: true,
    }
    params = {
        usertel: '',
        newpass: '',
        vcode: '',
        sure_pwd: ''
    }
    account = {
        id: null,
        accountNumber: '',
        loginPassword: '',
        landingType: 1,
        userId: null
    }
    code: any;
    username: any;
    constructor(private AuthenticationService: AuthenticationCodeService,
                private http: HttpClient,
                private toastController: ToastController,
                private router: Router,
                private alertController: AlertController,
                private localSotrage: LocalStorageService) {}

    ngOnInit() {
        this.username = this.localSotrage.get('currentUser', []).username;
    }
    async getCode() {
        this.verifyCode.disable = false;
        this.settime();
        this.code = this.AuthenticationService.createCode(6);
        console.log(this.code);
        await this.http.post(AppConfig.getDebugUrl() + '/sys/login/getCode', {
            "sid":"47892b61ea979b417ae61f8f1954d4e6",
            "token":"55b871f61437c08b2513b0980b7bb86e",
            "appid":"aa6511891c7f46459ef05e2f893eb3a3",
            "templateid":"447052",
            "param": this.code,
            "mobile": this.username,
        }).toPromise().then((response: any) => {
            if (response) {
                console.log("发送成功");
            } else {
                console.log("发送失败");
            }
        });
    }
    // 验证码倒计时
    settime() {
        if (this.verifyCode.totalTime === 0) {
            this.verifyCode.verifyCodeTips = '获取验证码';
            this.verifyCode.disable = true;
            this.verifyCode.totalTime = 60;
            return;
        } else {
            this.verifyCode.totalTime = this.verifyCode.totalTime - 1;
        }
        setTimeout(() => {
            this.verifyCode.verifyCodeTips = this.verifyCode.totalTime + '秒后重新获取';
            this.settime();
        }, 1000);
    }
    async onInputCode() {
        if (this.code == this.params.vcode) {
            /*
            *    修改用户密码
            * */

            let  result = 0;
            let message = ' ';
            this.account.accountNumber = this.username;
            this.account.loginPassword = this.params.newpass;
            await this.http.post(AppConfig.getDebugUrl() + '/users/forget', {
                'username': this.account.accountNumber, 'password': this.account.loginPassword,

            }).toPromise().then((response: any) => {
                result = 1;
            }).catch(error => {

                console.log(error.status);
                console.log(error.error); // error message as string
                console.log(error.headers);
                message = error.error.message;
            });
            if (result == 1) {
                const toast1 = await this.toastController.create({
                    message: '密码修改成功',
                    duration: 2300
                });
                toast1.present();
                history.go(-1);
            } else {
                const alert2 = await this.alertController.create({
                    message: message,
                    buttons: ['好的']
                });
                return await alert2.present();
            }
        } else {
            const alert2 = await this.alertController.create({
                message: '验证码输入错误',
                buttons: ['好的']
            });
            return await alert2.present();
        }
    }
    back() {
        history.go(-1);
    }

}
