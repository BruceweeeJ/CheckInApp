import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ToastController, AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AppConfig} from '../../model/appconfig';
import {Params, ActivatedRoute} from '@angular/router';
import {LocalStorageService} from "../../services/local-storage-service.service";

@Component({
  selector: 'app-checkinlist',
  templateUrl: './checkinlist.page.html',
  styleUrls: ['./checkinlist.page.scss'],
})
export class CheckinlistPage implements OnInit {
    user: any;
    course: any;
    response: any;
    checkList: any;
    length: any;
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
  async ionViewWillEnter() {
      await this.http.post(AppConfig.getDebugUrl() + '/course/getCheckList', {
          'courseNumber': this.course.courseNumber, 'stuId': this.course.stuId
      }).toPromise().then((response: any) => {
          this.response = response;
          console.log(response);
      });
      this.checkList = this.response.result;
      this.length = this.checkList.length;
  }
  ngOnInit() {
  }
    onback() {
        history.go(-1);
    }
}
