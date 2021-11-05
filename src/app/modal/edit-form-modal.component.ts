import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { User, UserFormComponent } from "../components/user-form.component";


@Component({
    selector: 'edit-form-modal.component',
    templateUrl: 'edit-form-modal.component.html',
    styleUrls: ['edit-form-modal.component.less']
})
export class EditFormModalComponent implements OnInit {

    @ViewChild('editForm', { static: true }) editForm!: UserFormComponent;

    constructor(
        public dialogRef: MatDialogRef<EditFormModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: User,
    ) { 
        
    }

    ngOnInit(): void {
        this.editForm.user = this.data;
    }

    save(): void {
        this.dialogRef.close(this.editForm.user);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}