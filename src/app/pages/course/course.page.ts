import { Component, OnInit, NgZone } from '@angular/core';
import {Params, ActivatedRoute, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {AppConfig} from "../../model/appconfig";

@Component({
  selector: 'app-course',
  templateUrl: './course.page.html',
  styleUrls: ['./course.page.scss'],
})
export class CoursePage implements OnInit {
  public course: any;
  constructor(public activeRoute: ActivatedRoute,
              public zone: NgZone,
              public router: Router,
              public http: HttpClient
              ) {
      // this.zone.run(() => {
      //     // 要更新视图的代码
      //     this.activeRoute.queryParams.subscribe((params: Params) => {
      //         this.course = params;
      //     });
      // });
      this.activeRoute.queryParams.subscribe((params: Params) => {
          this.course = params;
      });
  }
  courseinfo: any;
  checkin: any;
  checkinlist: any;
  courseMember: any;
  memberNumber: any;
    async ionViewWillEnter() {
        this.courseinfo = '/courseinfo' + '?courseNumber=' + this.course.courseNumber + '&stuId=' + this.course.stuId;
        this.checkin = '/checkin' + '?courseNumber=' + this.course.courseNumber + '&stuId=' + this.course.stuId;
        this.checkinlist = '/checkinlist' + '?courseNumber=' + this.course.courseNumber + '&stuId=' + this.course.stuId;
        await this.http.post(AppConfig.getDebugUrl() + '/course/showMember', {
            'courseNumber': this.course.courseNumber
        }).toPromise().then((response: any) => {
            this.courseMember = response;
            this.memberNumber = this.courseMember.length;
            console.log(this.courseMember);
        });
    }
  ngOnInit() {
    }
    onClick() {
        console.log('点击发射');
    }
    onCheckin() {
        this.router.navigateByUrl(this.checkin);
    }
    onCheckinlist() {
        this.router.navigateByUrl(this.checkinlist);
    }
    onCourseinfo() {
        this.router.navigateByUrl(this.courseinfo);
    }

}
