import { Component, NgZone } from '@angular/core';

import {MenuController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {LocalStorageService} from "./services/local-storage-service.service";


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    public appPages = [
        { title: '个人信息', url: '\home', icon: 'contact' },
        { title: '用户反馈', url: '\home', icon: 'filing' },
        { title: '关于我们', url: '\home', icon: 'contacts' },
        { title: '设置', url: '\home', icon: 'cog' }
    ];
    public information = {
        nickname: this.localStorageService.get('currentUser', []).nickname,
        username: this.localStorageService.get('currentUser', []).username,
    }
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private localStorageService: LocalStorageService,
        private zone: NgZone
    ) {
        this.zone.run(() => {
            // 要更新视图的代码
           this.information.nickname = this.localStorageService.get('currentUser', []).nickname;
           this.information.username = this.localStorageService.get('currentUser', []).username;
        });
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
}
