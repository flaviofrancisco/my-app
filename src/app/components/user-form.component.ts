import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

export interface User {
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'user-form',
  templateUrl: 'user-form.component.html',
  styleUrls: ['user-form.component.less']
})
export class UserFormComponent {

  get user(): User {
    return this.userForm.value;
  }

  set user(value: User) {
      this.userForm.setValue(value);
  }

  @Input() readonly: boolean = false;
  @Input('button-title') buttonTitle: string = ''; 
  @Input('cancel-button') hasCancelButton: boolean = false;
  @Output() onSave: EventEmitter<User> = new EventEmitter();
  @Output() onCancel: EventEmitter<void> = new EventEmitter();

    userForm = this.fb.group({
        firstName: [''],
        lastName: ['']
    });

    constructor(private fb: FormBuilder) {
        
    }

    cancel(): void {
      this.onCancel.emit();
    }
    save(): void {
      this.onSave.emit(this.userForm.value);
    }

}