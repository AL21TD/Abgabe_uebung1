import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';
import { ToastNotificationComponent } from 'src/app/toast-notification/toast-notification.component';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss'],
})
export class AddDataComponent implements OnInit {
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
    this.addChildForm = this.formbuilder.group({
      name: ['', [Validators.required, Validators.maxLength(25)]],
      kindergardenId: ['', Validators.required],
      birthDate: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
    });
  }

  onSubmit() {
    if (this.addChildForm.valid) {
      console.log(this.currentPage);
      this.backendService.addChildData(
        this.addChildForm.value,
        this.currentPage,
        () => this.toastNotification.showToast()
      );
    }
  }
}
