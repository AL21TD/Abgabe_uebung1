import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit {
  loading: boolean = false;
  length: number = 50; // Dies sollte dynamisch aus dem Backend abgerufen werden
  pageSize: number = 5;
  pageSizeOptions: number[] = [5, 10, 25];
  currentPage: number = 0;
  displayedColumns: string[] = [
    'name',
    'kindergarden',
    'address',
    'age',
    'birthdate',
    'registrationDate',
    'packageOption',
    'playgroup',
    'actions',
  ];

  constructor(
    public storeService: StoreService,
    private backendService: BackendService
  ) {}

  ngOnInit(): void {
    this.backendService.getChildren(this.currentPage, this.pageSize);
    this.backendService.getKindergardens();
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.backendService.getChildren(this.currentPage, this.pageSize);
  }

  getAge(birthDate: string) {
    var today = new Date();
    var birthDateTimestamp = new Date(birthDate);
    var age = today.getFullYear() - birthDateTimestamp.getFullYear();
    var m = today.getMonth() - birthDateTimestamp.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateTimestamp.getDate())) {
      age--;
    }
    return age;
  }

  cancelRegistration(childId: string) {
    this.loading = true;
    this.backendService
      .deleteChildData(childId, this.currentPage, this.pageSize)
      .subscribe({
        next: (_) => {
          this.loading = false;
        },
        error: (error) => {
          console.error('Fehler beim Abmelden des Kindes', error);
          this.loading = false;
        },
      });
  }

  filterByKindergarden(kindergardenId: number) {
    this.backendService.getChildrenByKindergarden(
      kindergardenId,
      this.currentPage,
      this.pageSize
    );
  }

  applySort(sortOption: string) {
    const [field, order] = sortOption.split('_');
    const sort = `${field},${order}`;
    this.backendService.getChildren(this.currentPage, this.pageSize, sort);
  }
}
