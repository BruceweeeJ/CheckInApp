import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ToastController, AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AppConfig} from '../../model/appconfig';
import {Params, ActivatedRoute} from '@angular/router';
import {LocalStorageService} from "../../services/local-storage-service.service";

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.page.html',
  styleUrls: ['./checkin.page.scss'],
})
export class CheckinPage implements OnInit {
  checkTime: any;
  user: any;
  course: any;
  response: any;
  constructor(
      private http: HttpClient,
      private toastController: ToastController,
      private router: Router,
      private alertController: AlertController,
      private activeRoute: ActivatedRoute,
      private zone: NgZone,
      private localStorageService: LocalStorageService
  ) {
    this.user = this.localStorageService.get('currentUser', []);
      this.zone.run(() => {
          // 要更新视图的代码
          this.activeRoute.queryParams.subscribe((params: Params) => {
              this.course = params;
          });
      });
  }

  ngOnInit() {
  }
  onback() {
      history.go(-1);
  }
  async checkIn() {
      this.checkTime = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
      await this.http.post(AppConfig.getDebugUrl() + '/course/checkIn', {
          'courseNumber': this.course.courseNumber, 'stuId': this.user.username, 'checkTime': this.checkTime
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
      } else {
          const alert = await this.alertController.create({
              header: '通知',
              message: this.response.result,
              buttons: ['OK']
          });
          await alert.present();
      }
  }
}
