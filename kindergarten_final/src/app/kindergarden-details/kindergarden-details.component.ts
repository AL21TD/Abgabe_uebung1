import { Component, OnInit } from '@angular/core';
import { Kindergarden, Typ } from '../shared/interfaces/Kindergarden';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../shared/backend.service';

@Component({
  selector: 'app-kindergarden-details',
  templateUrl: './kindergarden-details.component.html',
  styleUrls: ['./kindergarden-details.component.scss'],
})
export class KindergartenDetailsComponent implements OnInit {
  kindergarten: Kindergarden | undefined;

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.backendService.getKindergartenById(id).subscribe(
        (data) => (this.kindergarten = data),
        (error) => console.error(error)
      );
    } else {
      // Behandeln Sie den Fall, dass keine ID vorhanden ist
      console.error('Keine gültige ID in der URL gefunden');
    }
  }
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
