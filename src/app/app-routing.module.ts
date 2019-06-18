import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'welcome', loadChildren: './pages/welcome/welcome.module#WelcomePageModule' },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'forgot', loadChildren: './pages/forgot/forgot.module#ForgotPageModule' },
  { path: 'qrcode', loadChildren: './pages/qrcode/qrcode.module#QrcodePageModule' },
  { path: 'course', loadChildren: './pages/course/course.module#CoursePageModule' },
  { path: 'addCourse', loadChildren: './pages/add-course/add-course.module#AddCoursePageModule' },
  { path: 'joincourse', loadChildren: './pages/joincourse/joincourse.module#JoincoursePageModule' },
  { path: 'findcourse', loadChildren: './pages/findcourse/findcourse.module#FindcoursePageModule' },
  { path: 'courseinfo', loadChildren: './pages/courseinfo/courseinfo.module#CourseinfoPageModule' },
  { path: 'checkin', loadChildren: './pages/checkin/checkin.module#CheckinPageModule' },
  { path: 'checkinlist', loadChildren: './pages/checkinlist/checkinlist.module#CheckinlistPageModule' },  { path: 'setting', loadChildren: './pages/setting/setting.module#SettingPageModule' },
  { path: 'aboutus', loadChildren: './pages/aboutus/aboutus.module#AboutusPageModule' },
  { path: 'changepassword', loadChildren: './pages/changepassword/changepassword.module#ChangepasswordPageModule' }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
