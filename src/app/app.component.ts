import { Component } from '@angular/core';

import {MenuController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    public appPages = [
        { title: '资金账户', url: '\home', icon: 'logo-yen' },
        { title: '手机橱窗', url: '\home', icon: 'cash' },
        { title: '邀请有礼', url: '\home', icon: 'git-merge' },
        { title: '开店论坛', url: '\home', icon: 'chatboxes' },
        { title: '反馈建议', url: '\home', icon: 'create' },
        { title: '帮助中心', url: '\home', icon: 'construct' },
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
    ) {
        this.initializeApp();
        console.log(123);
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
}
