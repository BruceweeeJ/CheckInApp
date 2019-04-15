import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage implements OnInit {
// 生成二维码定义变量
    loginID = '';
    userName: string;
    createdCode: string;  //要生成的二维码内容变量
  constructor() { }

  ngOnInit() {
      this.createCode();
      this.createdCode = '我爱你加玲';
  }
    createCode() {
        console.log('二维码创建成功');
    }
}
