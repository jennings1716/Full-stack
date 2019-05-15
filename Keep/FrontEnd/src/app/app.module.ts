import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatListModule, MatDialogModule, MatSelectModule, MAT_DIALOG_DATA } from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {FormsModule,FormBuilder, FormGroup} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { NoteComponent } from './note/note.component';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoteTakerComponent } from './note-taker/note-taker.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { ListViewComponent } from './list-view/list-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import {RouterService} from './services/router.service';
import {SignupservService} from './services/signupserv.service';
import { LabelsService } from './services/labels.service';
import {ListNotesService} from './services/list-notes.service';
import {NotesService} from './services/notes.service';
import {AuthenticationService} from './services/authentication.service';

import {CanActivateRouteGuard} from './can-activate-route.guard';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './signup/signup.component';
import { EditlabelopenComponent } from './editlabelopen/editlabelopen.component';
import { EditlabelviewComponent } from './editlabelview/editlabelview.component';
import { SidenavigationComponent } from './sidenavigation/sidenavigation.component';
import { SharenoteviewComponent } from './sharenoteview/sharenoteview.component';
import { SharenoteopenComponent } from './sharenoteopen/sharenoteopen.component';

const appRoutes: Routes = [
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, children: [
      {
        path: 'view/noteview',
        component: NoteViewComponent
      }, {
        path: '',
        redirectTo: 'view/noteview',
        pathMatch: 'full'
      }, {
        path: 'view/listview',
        component: ListViewComponent
      },
      { path: 'note/:noteId/edit',
        component: EditNoteOpenerComponent,
        outlet: 'noteEditOutlet',
        canActivate: [CanActivateRouteGuard]
      },
      {
        path:'view/editlabels',
        component:EditlabelopenComponent
      },
      {
        path:'view/shareNotes',
        component:SharenoteopenComponent
      }

    ], canActivate: [CanActivateRouteGuard]},
];

@NgModule({
  declarations: [AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    NoteTakerComponent,
    NoteViewComponent,
    ListViewComponent,
    NoteComponent,
    EditNoteOpenerComponent,
    EditNoteViewComponent,
    SignupComponent,
    EditlabelopenComponent,
    EditlabelviewComponent,
    SidenavigationComponent,
    SharenoteviewComponent,
    SharenoteopenComponent
    ],
  imports: [ BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSidenavModule,
    FormsModule,
    MatListModule,
    HttpClientModule,
    ReactiveFormsModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    RouterModule.forRoot(appRoutes) ],
  providers: [LabelsService,NotesService, AuthenticationService, RouterService, CanActivateRouteGuard,SignupservService,ListNotesService],
   bootstrap: [AppComponent],
  entryComponents: [EditNoteViewComponent,EditlabelviewComponent,SharenoteviewComponent ]
})

export class AppModule { }
