import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPalletModalComponent } from './edit-pallet-modal.component';

describe('EditPalleteModalComponent', () => {
  let component: EditPalletModalComponent;
  let fixture: ComponentFixture<EditPalletModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPalletModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPalletModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
