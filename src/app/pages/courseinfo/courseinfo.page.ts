import { Component, OnInit, NgZone } from '@angular/core';
import {Params, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-courseinfo',
  templateUrl: './courseinfo.page.html',
  styleUrls: ['./courseinfo.page.scss'],
})
export class CourseinfoPage implements OnInit {
  course: any;
  constructor(
      public activeRoute: ActivatedRoute,
      public zone: NgZone
  ) {
      this.zone.run(() => {
          // 要更新视图的代码
          this.activeRoute.queryParams.subscribe((params: Params) => {
              this.course = params;
          });
          console.log(this.course);
      });
  }

  ngOnInit() {
  }

}
