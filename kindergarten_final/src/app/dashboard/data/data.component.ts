import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { CHILDREN_PER_PAGE } from 'src/app/shared/constants';
import { StoreService } from 'src/app/shared/store.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit {
  loading: boolean = false;
  length = 50;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25];

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.selectPage(event.pageIndex);
  }
  displayedColumns: string[] = [
    'name',
    'kindergarden',
    'address',
    'age',
    'birthdate',
    'actions',
  ];

  constructor(
    public storeService: StoreService,
    private backendService: BackendService
  ) {}
  @Input() currentPage!: number;
  @Output() selectPageEvent = new EventEmitter<number>();
  public page: number = 0;

  ngOnInit(): void {
    this.backendService.getChildren(this.currentPage);
    this.backendService.getKindergardens();
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

  selectPage(i: any) {
    let currentPage = i;
    this.selectPageEvent.emit(currentPage);
    this.backendService.getChildren(currentPage);
  }

  public returnAllPages() {
    return Math.ceil(this.storeService.childrenTotalCount / CHILDREN_PER_PAGE);
  }

  public cancelRegistration(childId: string) {
    this.loading = true; // Lade-Indikator anzeigen

    this.backendService.deleteChildData(childId, this.currentPage).subscribe({
      next: (_) => {
        // ... Aktionen nach erfolgreichem Löschen ...
        this.loading = false; // Lade-Indikator verbergen
      },
      error: (error) => {
        // ... Fehlerbehandlung ...
        this.loading = false; // Lade-Indikator auch im Fehlerfall verbergen
      },
    });
  }

  filterByKindergarden(kindergardenId: number) {
    this.backendService.getChildrenByKindergarden(
      kindergardenId,
      this.currentPage
    );
  }
}
