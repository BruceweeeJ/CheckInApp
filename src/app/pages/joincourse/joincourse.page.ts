import { Component, OnInit } from '@angular/core';
import {Params, ActivatedRoute, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {AppConfig} from "../../model/appconfig";
import {ToastController, AlertController} from '@ionic/angular';
import {LocalStorageService} from "../../services/local-storage-service.service";

@Component({
  selector: 'app-joincourse',
  templateUrl: './joincourse.page.html',
  styleUrls: ['./joincourse.page.scss'],
})
export class JoincoursePage implements OnInit {
    courseNumber: any;
    response: any;
    course = {
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
  constructor(public activeRoute: ActivatedRoute,
              public router: Router,
              public http: HttpClient,
              public alertController: AlertController,
              public localStorage: LocalStorageService
              ) { }

  ngOnInit() {
      this.activeRoute.queryParams.subscribe((params: Params) => {
          this.courseNumber = params['courseNumber'];
      });
      console.log(this.courseNumber);
  }
  async ionViewWillEnter () {
      await this.http.post(AppConfig.getDebugUrl() + '/course/search', {
          'courseNumber': this.courseNumber
      }).toPromise().then((response) => {
          this.response = response;
      });
      if (this.response.code === '200') {
          this.course = this.response.result;
      } else {
          const alert = await this.alertController.create({
              header: '提示',
              message: this.response.result,
              buttons: ['OK']
          });
          await alert.present();
          history.go(-1);
      }
  }
  async onJoin() {
      const user = this.localStorage.get('currentUser',[]);
      await this.http.post(AppConfig.getDebugUrl() + '/course/joinCourse', {
          'courseNumber': this.courseNumber, 'courseName': this.course.courseName, 'teachName': this.course.teachName,
          'stuName': user.nickname, 'stuId': user.username, 'className': this.course.className,
      }).toPromise().then((response) => {
          this.response = response;
          console.log(response);
      });
      if (this.response.code === '200') {
          this.router.navigateByUrl('/course' + '?courseNumber=' + this.courseNumber + '&courseName=' + this.course.courseName);
          const alert = await this.alertController.create({
              header: '提示',
              message: this.response.result,
              buttons: ['OK']
          });
          return await alert.present();
      } else {
          const alert = await this.alertController.create({
              header: '提示',
              message: this.response.result,
              buttons: ['OK']
          });
          alert.present();
          this.router.navigateByUrl('/menu');
      }
  }
}
