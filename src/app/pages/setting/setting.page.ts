import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(
      private alertController: AlertController,
      private toast: ToastController,
      private router: Router
  ) { }

  ngOnInit() {
  }
  async onUpdate() {
      const toast = await this.toast.create({
          message: '已是最新版本!',
          duration: 1500
      });
      return await toast.present();
  }
  onLogout() {
    this.router.navigateByUrl('/login');
  }
  back() {
      history.go(-1);
  }

}
