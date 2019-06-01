import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from "../../services/local-storage-service.service";
import {AuthenticationCodeService} from "../../services/authentication-code-service.service";
import { HttpClient } from '@angular/common/http';
import {AppConfig} from "../../model/appconfig";
import {ToastController, AlertController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.page.html',
  styleUrls: ['./add-course.page.scss'],
})
export class AddCoursePage implements OnInit {
  user: any;
  course: any;
  constructor(
      private AuthenticationService: AuthenticationCodeService,
      private localStorageService: LocalStorageService,
      private http: HttpClient,
      private router: Router,
      private toastController: ToastController,
      private alertController: AlertController
  ) {
    this.user = this.localStorageService.get('currentUser', []);
  }

  ngOnInit() {
    this.course = {
      courseNumber: this.AuthenticationService.createCode(6),
      courseName: '',
      teachName: this.user.nickname,
      className: '',
      schoolName: '',
      schoolTerm: '',
      requirement: '',
      progress: '',
      schedule: ''
    };
  }

  async onInputCode() {
    let result: any;
    console.log(this.course);
      await this.http.post(AppConfig.getDebugUrl() + '/course/save', {
          'courseNumber': this.course.courseNumber, 'courseName': this.course.courseName, 'teachName': this.course.teachName,
          'className': this.course.className, 'schoolName': this.course.schoolName, 'schoolTerm': this.course.schoolTerm,
          'requirement': this.course.requirement, 'progress': this.course.progress, 'schedule': this.course.schedule,

      }).toPromise().then((response: any) => {
          result = response;
      }).catch(error => {
            result = error.status;
      });
      if (result === 200) {
          const toast1 = await this.toastController.create({
              message: '创建成功',
              duration: 600
          });
          toast1.present();
          this.router.navigateByUrl('\menu');
      } else {
          const toast1 = await this.toastController.create({
              message: '创建失败',
              duration: 600
          });
          toast1.present();
          this.router.navigateByUrl('\menu');
      }
  }

}
