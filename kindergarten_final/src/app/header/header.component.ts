import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public title: string = 'Kindergarden-App';
  public imagePath: string = './../assets/images/kindergarden.jpg';
  public isMenuOpen: boolean = false;
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  closeSidenav() {
    this.isMenuOpen = false;
  }

  constructor() {}

  ngOnInit(): void {}
}
