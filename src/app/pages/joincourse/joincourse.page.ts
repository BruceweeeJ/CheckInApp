import { Component, OnInit } from '@angular/core';
import {Params, ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-joincourse',
  templateUrl: './joincourse.page.html',
  styleUrls: ['./joincourse.page.scss'],
})
export class JoincoursePage implements OnInit {
    courseNumber: any;
  constructor(public activeRoute: ActivatedRoute,
              public router: Router
              ) { }

  ngOnInit() {
      this.activeRoute.queryParams.subscribe((params: Params) => {
          this.courseNumber = params['courseNumber'];
      });
      console.log(this.courseNumber);
  }
  onJoin() {
    this.router.navigateByUrl('/course' + '?courseNumber=' + this.courseNumber);
  }
}
