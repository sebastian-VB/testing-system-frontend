import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AuthGuard } from './services/auth.guard';
import { NormalGuard } from './services/normal.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewExamsComponent } from './pages/admin/view-exams/view-exams.component';
import { AddExamComponent } from './pages/admin/add-exam/add-exam.component';
import { UpdateExamComponent } from './pages/admin/update-exam/update-exam.component';
import { ViewExamQuestionComponent } from './pages/admin/view-exam-question/view-exam-question.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { LoadExamUserComponent } from './pages/user/load-exam-user/load-exam-user.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { StartExamsComponent } from './pages/user/start-exams/start-exams.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'signup', component: SignupComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent, pathMatch: 'full'},

  {path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard], children: [
    {path: '', component: WelcomeComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'categories', component: ViewCategoriesComponent},
    {path: 'add-category', component: AddCategoryComponent},
    {path: 'exams', component: ViewExamsComponent},
    {path: 'add-exam', component: AddExamComponent},
    {path: 'exam/:examId', component: UpdateExamComponent},
    {path: 'view-question/:examId/:title', component: ViewExamQuestionComponent},
    {path: 'add-question/:examId/:title', component: AddQuestionComponent},
    {path: 'question/:questionId', component: UpdateQuestionComponent},
  ]},
  {path: 'user-dashboard', component: UserDashboardComponent, canActivate: [NormalGuard], children: [
    {path: ':categoryId', component: LoadExamUserComponent},
    {path: 'instructions/:examId', component: InstructionsComponent}
  ]},
  {path: 'start/:examId', component: StartExamsComponent, canActivate: [NormalGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
