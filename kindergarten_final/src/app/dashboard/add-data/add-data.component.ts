import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';
import { ToastNotificationComponent } from 'src/app/toast-notification/toast-notification.component';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss'],
})
export class AddDataComponent implements OnInit {
  showError: boolean = false;
  loading: boolean = false;
  @ViewChild(ToastNotificationComponent)
  toastNotification: ToastNotificationComponent =
    new ToastNotificationComponent();

  public addChildForm: any;
  @Input() currentPage!: number;

  constructor(
    private formbuilder: FormBuilder,
    public storeService: StoreService,
    public backendService: BackendService
  ) {}

  ngOnInit(): void {
    // Hier wird das addChildForm FormGroup erstellt und initialisiert
    this.addChildForm = this.formbuilder.group({
      name: ['', [Validators.required, Validators.maxLength(25)]],
      kindergardenId: ['', Validators.required],
      birthDate: ['', [Validators.required, dateValidator]],
      packageOption: ['', Validators.required],
      playgroup: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.addChildForm.valid) {
      this.loading = true; // Aktiviert den Lade-Spinner

      // Setzt das aktuelle Datum und die Uhrzeit als Anmeldedatum
      const currentDate = new Date();
      this.addChildForm.value.registrationDate = currentDate.toISOString();

      // Ruft die Methode addChildData im BackendService auf und verarbeitet die Antwort
      this.backendService.addChildData(
        this.addChildForm.value,
        this.currentPage,
        () => {
          this.toastNotification.showToast();
          this.loading = false; // Deaktiviert den Lade-Spinner, wenn der Vorgang abgeschlossen ist
        }
      );
    } else {
      this.showError = true; // Setzt showError auf true, wenn das Formular ungültig ist
    }
  }
}

// Diese Funktion dient zur Validierung des Datumsformats im Formular
function dateValidator(control: FormControl): { [key: string]: any } | null {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (control.value && !dateRegex.test(control.value)) {
    return { dateInvalid: true };
  }
  return null;
}
