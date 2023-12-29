import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-drink-size-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
    NgIf,
  ],
  templateUrl: './drink-size-dialog.component.html',
  styleUrl: './drink-size-dialog.component.css',
})
export class DrinkSizeDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DrinkSizeDialogComponent>,
  ) {
    this.form = this.fb.group({
      drinkSize: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  onSubmit() {
    // the + operator converts string to number
    this.dialogRef.close(+this.form.value.drinkSize);
  }
}
