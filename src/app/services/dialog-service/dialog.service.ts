import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DrinkSizeDialogComponent } from '../../components/dialog/drink-size-dialog/drink-size-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openDrinkSizeDialog(): Observable<any> {
    const dialogRef = this.dialog.open(DrinkSizeDialogComponent, {
      width: '250px',
    });

    return dialogRef.afterClosed();
  }
}
