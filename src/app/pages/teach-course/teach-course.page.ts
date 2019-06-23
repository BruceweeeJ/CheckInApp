import { Component, OnInit, NgZone } from '@angular/core';
import {Params, ActivatedRoute, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {AppConfig} from "../../model/appconfig";

@Component({
  selector: 'app-teach-course',
  templateUrl: './teach-course.page.html',
  styleUrls: ['./teach-course.page.scss'],
})
export class TeachCoursePage implements OnInit {

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
        // this.activeRoute.queryParams.subscribe((params: Params) => {
        //     this.course = params;
        // });
        // this.course.courseNumber = this.activeRoute.snapshot.paramMap.get('courseNumber');
        // console.log(this.course.courseNumber);
        // console.log(this.course.courseNumber);
        this.courseinfo = '/courseinfo' + '?courseNumber=' + this.course.courseNumber ;
        this.checkin = '/raisecheck' + '?courseNumber=' + this.course.courseNumber;
        this.checkinlist = '/checkinlist' + '?courseNumber=' + this.course.courseNumber;
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
    onCheckinlist(stuId: any) {
        this.router.navigateByUrl(this.checkinlist + '&stuId=' + stuId);
    }
    onCourseinfo() {
        this.router.navigateByUrl(this.courseinfo);
    }


}
