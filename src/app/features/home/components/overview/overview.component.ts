import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { BreadcrumpService } from '@core/services/breadcrump.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.sass'],
})
export class OverviewComponent implements OnInit, AfterViewInit {
  menubarItems!: any[];
  responsiveOptions!: any[];
  gamesCarousel!: any[];

  constructor(private elementRef: ElementRef, private breadcrumps: BreadcrumpService) {
    this.breadcrumps.setItems([
      { label: '', routerLink: ['/'] },
      { label: 'Home', routerLink: ['/'] },
    ]);
  }

  ngOnInit(): void {
    this.menubarItems = [
      {
        label: 'Server',
        icon: 'pi pi-fw pi-server',
        items: [
          {
            label: 'List',
            icon: 'pi pi-fw pi-list',
          },
        ],
      },
    ];

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
      },
    ];

    this.gamesCarousel = [
      {
        name: 'ARK',
        image: 'assets/images/ark-server-png-4.png',
      },
      {
        name: "Garry's Mod",
        image: "assets/images/Garry's_Mod_logo.svg.png",
      },
      {
        name: 'Minecraft',
        image: 'assets/images/Minecraft-Logo.png',
      },
      {
        name: 'TTT',
        image: 'assets/images/1424167075_preview_TTT.jpg',
      },
      {
        name: 'Minecraft',
        image: 'assets/images/Minecraft-Logo.png',
      },
    ];
  }

  ngAfterViewInit(): void {}
}
