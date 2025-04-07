import {Component, inject, TemplateRef, ViewChild, viewChild} from '@angular/core';
import {SOUNDS} from '../../store/sounds.const';
import {JsonPipe} from '@angular/common';
import {PalletService} from '../../services/pallet.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-edit-pallet-modal',
  standalone: true,
  templateUrl: './edit-pallet-modal.component.html',
  imports: [
    JsonPipe,
    FormsModule
  ],
  styleUrl: './edit-pallet-modal.component.scss'
})
export class EditPalletModalComponent {
  @ViewChild('dialogElement') dialog: TemplateRef<any> | undefined;
  isDialogOpen = false;

  soundsJSON = inject(PalletService).soundSignal;
  protected readonly JSON = JSON;
}
