import { Component, OnInit } from '@angular/core';
import { BackendService } from '../shared/backend.service';
import { Kindergarden, Typ } from '../shared/interfaces/Kindergarden';

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

  //Eine Funktion um den Typen in Human-redable umzuwandeln.
  getTypName(typ: Typ): string {
    switch (typ) {
      case Typ.privat:
        return 'Privat';
      case Typ.oeffentlich:
        return 'Öffentlich';
      default:
        return 'Unbekannt';
    }
  }
}
