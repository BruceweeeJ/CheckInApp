import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ToastController, AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AppConfig} from '../../model/appconfig';
import {Params, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-raisecheck',
  templateUrl: './raisecheck.page.html',
  styleUrls: ['./raisecheck.page.scss'],
})
export class RaisecheckPage implements OnInit {
    verifyCode: any = {
        verifyCodeTips: '点击发起签到',
        totalTime: 90,
        disable: true,
    }
    checkTime: any;
    response: any;
    course: any;
  constructor(
      private http: HttpClient,
      private toastController: ToastController,
      private router: Router,
      private alertController: AlertController,
      private activeRoute: ActivatedRoute,
      private zone: NgZone,
  ) {
      this.zone.run(() => {
          // 要更新视图的代码
          this.activeRoute.queryParams.subscribe((params: Params) => {
              this.course = params;
          });
      });
  }
  ngOnInit() {
      console.log(this.checkTime);
  }
    async settime() {
        if (this.verifyCode.totalTime === 0) {
            this.verifyCode.verifyCodeTips = '点击发起签到';
            this.verifyCode.disable = true;
            this.verifyCode.totalTime = 90;
            // 签到结束后重新将课程中的tag标签改成0表示现在还未发起签到
            await this.http.post(AppConfig.getDebugUrl() + '/course/endCheck', {
                'courseNumber': this.course.courseNumber
            }).toPromise().then((response: any) => {
            });
            console.log('签到结束');
            return;
        } else {
            this.verifyCode.totalTime = this.verifyCode.totalTime - 1;
        }
        setTimeout(() => {
            this.verifyCode.verifyCodeTips = '签到剩余时间' + this.verifyCode.totalTime + '秒';
            this.settime();
            }, 1000);
    }
  async raiseCheck() {
      this.checkTime = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
      // 发起签到讲课程中的tag改成1表示现在处于签到时间
      await this.http.post(AppConfig.getDebugUrl() + '/course/raiseCheck', {
          'courseNumber': this.course.courseNumber, 'lastCheckTime': this.checkTime
      }).toPromise().then((response: any) => {
          this.response = response;
      });
      if (this.response.code === '200') {
          const alert = await this.alertController.create({
              header: '通知',
              message: this.response.result,
              buttons: ['OK']
          });
          await alert.present();
      }
      this.verifyCode.disable = false;
      this.settime();
  }
  onback() {
     history.go(-1);
    }
  oncheck() {
     console.log(1);
  }
}
