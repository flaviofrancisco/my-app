import { ThrowStmt } from '@angular/compiler';
import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { User, UserFormComponent } from './components/user-form.component';
import { EditFormModalComponent } from './modal/edit-form-modal.component';
import { UserService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  
  title = 'my-app-ui';

  @ViewChild('userForm') userForm: UserFormComponent;

  userSubject = new Subject();
  userObservable$ = this.userSubject.asObservable();

  constructor(
    public dialog: MatDialog,
    public userService: UserService) {

  }
  ngOnInit(): void {

    this.userObservable$.pipe(mergeMap((x:User) => this.userService.setUser$(x))).subscribe(x => {
      this.userForm.user = x;
    });

    this.userService.getUser$().subscribe((x:User) => {
      this.userForm.user = x;
    });  
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(EditFormModalComponent, {
      width: '350px',
      data: this.userForm.user,
    });

    dialogRef.afterClosed().subscribe(result => {      
      this.userSubject.next(result);
    });
  }
}