import { Component, OnInit, NgZone } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import {Course} from '../../model/Course';
import {Router} from '@angular/router';
import { Location} from '@angular/common';
@Component({
    selector: 'app-menu',
    templateUrl: './menu.page.html',
    styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
    public Courses = new Array(new Course(), new Course());
    constructor(public actionSheetController: ActionSheetController,
                public router: Router,
                public location: Location,
                private zone: NgZone) {
        this.zone.run(() => {
            // 要更新视图的代码
            console.log("刷新");
        });
    }
    ionViewWillEnter() {
        console.log("进入菜单");
    }
    ngOnInit() {
        this.Courses[0].courseId = '000001';
        this.Courses[0].className = '示范1班';
        this.Courses[0].courseName = '示范1课';
        this.Courses[0].teacherName = '魏文诚';

        this.Courses[1].courseId = '000002';
        this.Courses[1].className = '示范2班';
        this.Courses[1].courseName = '示范2课';
        this.Courses[1].teacherName = '陈加玲';

        console.log(this.Courses);
    }
    async presentActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            buttons: [{
                text: '创建班课',
                role: 'destructive',
                icon: 'hammer',
                handler: () => {
                    console.log('Delete clicked');
                }
            }, {
                text: '使用班课号加入班课',
                icon: 'return-right',
                handler: () => {
                    console.log('Share clicked');
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

    onRefresh(event) {
        try {
            if (1 && 1) {
                setTimeout(() => {
                    event.target.complete();
                }, 500);
            }
            else {
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
                courseId: item.courseId,
                courseName: item.courseName,
                className: item.className,
                teacherName: item.teacherName
            }
        });
    }

}
