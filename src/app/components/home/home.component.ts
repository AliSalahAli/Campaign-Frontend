import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  items: MenuItem[] | undefined = [
    {
      label: 'Home',
      icon: 'pi pi-home',
    }
  ];
  constructor() {}

  ngOnInit() {}
}
