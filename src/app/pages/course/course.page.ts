import { Component, OnInit, NgZone } from '@angular/core';
import {Params, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-course',
  templateUrl: './course.page.html',
  styleUrls: ['./course.page.scss'],
})
export class CoursePage implements OnInit {
  public course: any;
  constructor(public activeRoute: ActivatedRoute,
              public zone: NgZone) {
      this.zone.run(() => {
          // 要更新视图的代码
          this.activeRoute.queryParams.subscribe((params: Params) => {
              this.course = params;
          });
          console.log(this.course);
      });
  }

  ngOnInit() {}
    ionViewWillEnter() {
    }
}
