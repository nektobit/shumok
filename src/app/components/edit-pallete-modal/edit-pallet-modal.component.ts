// src/app/components/edit-pallet-modal/edit-pallet-modal.component.ts
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule
} from '@angular/forms';
import { PalletService } from '../../services/pallet.service';
import { Sound } from '../../app.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-edit-pallet-modal',
  templateUrl: './edit-pallet-modal.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf],
  styleUrls: ['./edit-pallet-modal.component.scss']
})
export class EditPalletModalComponent implements OnInit {
  form!: FormGroup;
  isDialogOpen = false;

  constructor(
    private fb: FormBuilder,
    private palletService: PalletService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      sounds: this.fb.array([])
    });
    this.loadForm();
  }

  private loadForm(): void {
    this.soundsArray.clear();
    const current = this.palletService.soundSignal();
    current.forEach(sound => {
      this.soundsArray.push(this.fb.group({
        id:       [sound.id, Validators.required],
        title:    [sound.title, Validators.required],
        fileUrl:  [sound.fileUrl, [Validators.required, Validators.pattern(/^https?:\/\//)]],
        category: [sound.category]
      }));
    });
  }

  get soundsArray(): FormArray {
    return this.form.get('sounds') as FormArray;
  }

  addSound(): void {
    this.soundsArray.push(this.fb.group({
      id:       ['', Validators.required],
      title:    ['', Validators.required],
      fileUrl:  ['', [Validators.required, Validators.pattern(/^https?:\/\//)]],
      category: ['']
    }));
  }

  removeSound(i: number): void {
    this.soundsArray.removeAt(i);
  }

  save(): void {
    if (this.form.valid) {
      const list: Sound[] = this.form.value.sounds;
      this.palletService.setSounds(list);
      this.close();
    } else {
      this.form.markAllAsTouched();
    }
  }

  /** Скачать текущий список звуков как JSON-файл */
  exportSounds(): void {
    const url = this.palletService.exportSounds();
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sounds.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  /** Подгрузить список звуков по ссылке и сразу сохранить */
  async importFromUrl(link: string): Promise<void> {
    if (!link) {
      alert('Введите корректную ссылку');
      return;
    }
    try {
      await this.palletService.importSoundsFromUrl(link);
      this.close();
    } catch (e: any) {
      console.error(e);
      alert('Не удалось загрузить список: ' + e.message);
    }
  }

  open(): void { this.isDialogOpen = true; }
  close(): void { this.isDialogOpen = false; }
}
