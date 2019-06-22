import { Component, OnInit, NgZone } from '@angular/core';
import {Params, ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {AppConfig} from "../../model/appconfig";
import {ToastController, AlertController} from '@ionic/angular';

@Component({
  selector: 'app-courseinfo',
  templateUrl: './courseinfo.page.html',
  styleUrls: ['./courseinfo.page.scss'],
})
export class CourseinfoPage implements OnInit {
    courseInfo = {
        courseNumber: '',
        courseName: '',
        teachName: '',
        className: '',
        schoolName: '',
        schoolTerm: '',
        requirement: '未设置',
        progress: '未设置',
        schedule: '未设置',
        teachNumber: '',
    };
    course: any;
  constructor(
      public activeRoute: ActivatedRoute,
      public zone: NgZone,
      private http: HttpClient,
      private alertController: AlertController
  ) {
      this.zone.run(() => {
          // 要更新视图的代码
          this.activeRoute.queryParams.subscribe((params: Params) => {
              this.course = params;
          });
      });
  }
  async ionViewWillEnter() {
      await this.http.post(AppConfig.getDebugUrl() + '/course/courseInfo', {
          'courseNumber': this.course.courseNumber
      }).toPromise().then((response: any) => {
          this.courseInfo = response;
      });
  }
  async detail(flag: any) {
      if (flag === 1) {
          if (this.courseInfo.requirement === '') {
              this.courseInfo.requirement = '未设置';
          }
          const alert = await this.alertController.create({
              header: '学习要求',
              message: this.courseInfo.requirement,
              buttons: ['OK']
          });
          await alert.present();
      }
      if (flag === 2) {
          if (this.courseInfo.progress === '') {
              this.courseInfo.progress = '未设置';
          }
          const alert = await this.alertController.create({
              header: '考试进度',
              message: this.courseInfo.progress,
              buttons: ['OK']
          });
          await alert.present();
      }
      if (flag === 3) {
          if (this.courseInfo.schedule === '') {
              this.courseInfo.schedule = '未设置';
          }
          const alert = await this.alertController.create({
              header: '考试安排',
              message: this.courseInfo.schedule,
              buttons: ['OK']
          });
          await alert.present();
      }

  }
  ngOnInit() {
  }
    onback() {
        history.go(-1);
    }
}
