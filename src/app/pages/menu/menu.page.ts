import { Component, OnInit, NgZone } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import {Course} from '../../model/Course';
import {Router} from '@angular/router';
import { Location} from '@angular/common';
import {AppConfig} from "../../model/appconfig";
import { HttpClient } from '@angular/common/http';
import {LocalStorageService} from "../../services/local-storage-service.service";
@Component({
    selector: 'app-menu',
    templateUrl: './menu.page.html',
    styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
    public course: any;
    public user: any;
    constructor(public actionSheetController: ActionSheetController,
                public router: Router,
                public location: Location,
                private zone: NgZone,
                private http: HttpClient,
                private localStorageService: LocalStorageService) {
        this.zone.run(() => {
            // 要更新视图的代码
            console.log("刷新");
        });
    }
    async ionViewWillEnter() {
        console.log("进入菜单");
        // await this.http.get(AppConfig.getDebugUrl() + '/sys/login/current', {
        // }).toPromise().then((response) => {
        //     this.user = response;
        // });
        this.user = this.localStorageService.get('currentUser', []);
        await this.http.post(AppConfig.getDebugUrl() + '/users/course', {
            'stuId': this.user.username
        }).toPromise().then((response) => {
            this.course = response;
        });
    }

    ngOnInit() {
    }
    async presentActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            buttons: [{
                text: '创建班课',
                role: 'destructive',
                icon: 'hammer',
                handler: () => {
                    this.router.navigateByUrl('/addCourse');
                }
            }, {
                text: '使用班课号加入班课',
                icon: 'return-right',
                handler: () => {
                    this.router.navigateByUrl('/findcourse');
                }
            },  {
                text: '取消',
                icon: 'close',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
            }]
        });
        await actionSheet.present();
    }
    delete(item: any) {
        console.log(item);
    }

    async onRefresh(event) {
        try {
            if (1 && 1) {
                await this.http.post(AppConfig.getDebugUrl() + '/users/course', {
                    'stuId': this.user.username
                }).toPromise().then((response) => {
                    this.course = response;
                });
                setTimeout(() => {
                    event.target.complete();
                }, 500);
            } else {
                setTimeout(() => {
                    event.target.complete();
                }, 500);
            }
        } catch (error) {
            console.log(error);
        }
    }
    selectCourse(item: any) {
        this.router.navigate(['/course'], {
            queryParams: {
                courseNumber: item.courseNumber,
                courseName: item.courseName,
                className: item.className,
                teachName: item.teachName,
                stuName: item.stuName,
                stuId: item.stuId
            }
        });
    }
    async click() {
        await this.http.post(AppConfig.getDebugUrl() + '/users/course', {
            'stuId': this.user.username
        }).toPromise().then((response) => {
            console.log(response[0]);
        });
    }
}
