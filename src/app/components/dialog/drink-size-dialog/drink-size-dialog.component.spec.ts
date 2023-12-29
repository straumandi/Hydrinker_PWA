import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinkSizeDialogComponent } from './drink-size-dialog.component';

describe('DrinkSizeDialogComponent', () => {
  let component: DrinkSizeDialogComponent;
  let fixture: ComponentFixture<DrinkSizeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrinkSizeDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DrinkSizeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
