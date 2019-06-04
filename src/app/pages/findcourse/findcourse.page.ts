import { Component, OnInit } from '@angular/core';
import {ToastController, AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-findcourse',
  templateUrl: './findcourse.page.html',
  styleUrls: ['./findcourse.page.scss'],
})
export class FindcoursePage implements OnInit {
  courseNumber: any;
  constructor(
      private toastController: ToastController,
      private alertController: AlertController,
      private router: Router,
  ) { }

  ngOnInit() {
    this.courseNumber = '';
  }
  async onfind() {
    if (this.courseNumber === '' ||  this.courseNumber === '请输入班课号') {
        const toast1 = await this.toastController.create({
            message: '请输入班课号',
            duration: 600,
        });
        toast1.present();
    } else {
      this.router.navigate(['/joincourse'], {
        queryParams: {
          courseNumber: this.courseNumber
        }
      });
    }
  }
}
