import { Component, OnInit } from '@angular/core';
import { BackendService } from '../shared/backend.service';
import { Kindergarden } from '../shared/interfaces/Kindergarden';

@Component({
  selector: 'app-kindergarden-list-details',
  templateUrl: './kindergarden-list-details.component.html',
  styleUrls: ['./kindergarden-list-details.component.scss'],
})
export class KindergartenListDetailsComponent implements OnInit {
  kindergardens: Kindergarden[] | undefined;

  constructor(private backendService: BackendService) {}

  ngOnInit() {
    this.backendService.getAllKindergardens().subscribe(
      (data: Kindergarden[] | undefined) => (this.kindergardens = data),
      (error: any) => console.error(error)
    );
  }
}
