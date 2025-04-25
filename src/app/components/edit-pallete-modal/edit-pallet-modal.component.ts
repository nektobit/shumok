// edit-pallet-modal.component.ts
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule} from '@angular/forms';
import {PalletService} from '../../services/pallet.service';
import {Sound} from '../../app.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-edit-pallet-modal',
  templateUrl: './edit-pallet-modal.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  styleUrls: ['./edit-pallet-modal.component.scss']
})
export class EditPalletModalComponent implements OnInit {
  isDialogOpen = false;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private palletService: PalletService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    const sounds = this.palletService.soundSignal();
    this.form = this.fb.group({
      sounds: this.fb.array(sounds.map(sound => this.createSoundGroup(sound)))
    });
  }

  private createSoundGroup(sound: Sound): FormGroup {
    return this.fb.group({
      id: [sound.id],
      title: [sound.title],
      fileUrl: [sound.fileUrl],
      category: [sound.category || 'focus']
    });
  }

  get soundsArray(): FormArray {
    return this.form.get('sounds') as FormArray;
  }

  addSound() {
    const newSound = {id: null, title: '', file: {url: ''}, category: 'focus'} as unknown as Sound;
    this.soundsArray.push(this.createSoundGroup(newSound));
  }

  removeSound(index: number) {
    this.soundsArray.removeAt(index);
  }

  save() {

    if (this.form.valid) {
      const updatedSounds = this.form.getRawValue().sounds;

      this.palletService.soundSignal.set(updatedSounds);
      this.close();
    } else {
      this.form.markAllAsTouched();
    }
  }

  open() {
    this.isDialogOpen = true;
  }

  close() {
    this.isDialogOpen = false;
  }
}
