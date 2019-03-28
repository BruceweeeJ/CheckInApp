import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.page.html',
    styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

    constructor(public actionSheetController: ActionSheetController) { }

    ngOnInit() {
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


}
