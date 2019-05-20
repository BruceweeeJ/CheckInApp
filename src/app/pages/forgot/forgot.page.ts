import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ToastController, AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AppConfig} from '../../model/appconfig';
import {AuthenticationCodeService} from "../../services/authentication-code-service.service";

@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.page.html',
    styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
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
    constructor(private AuthenticationService: AuthenticationCodeService,
                private http: HttpClient,
                private toastController: ToastController,
                private router: Router,
                private alertController: AlertController) { }

    ngOnInit() {
    }
    async getCode() {
        const myreg = /^1[3|4|5|7|8][0-9]{9}$/;
        if (!myreg.test(this.params.usertel)) {
            const  toast1 = await this.toastController.create({
                message: '请输入正确手机号',
                duration: 1500
            });
            toast1.present();
            return 0;
        }
        // 发送验证码成功后开始倒计时
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
            "mobile": this.params.usertel,
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
        const myreg = /^1[3|4|5|7|8][0-9]{9}$/;
        if (!myreg.test(this.params.usertel)) {
            const alert1 = await this.alertController.create({
                message: '请输入正确手机号',
                buttons: ['好的']
            });
            return await alert1.present();
        } else if (this.code == this.params.vcode) {
            /*
            *    修改用户密码
            * */

            let  result = 0;
            let message = ' ';
            this.account.accountNumber = this.params.usertel;
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
                this.router.navigateByUrl('\login');
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

}
