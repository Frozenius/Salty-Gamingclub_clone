import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.sass'],
})
export class ServerComponent implements OnInit {
  server: any[] = [
    {
      server: '0',
      name: 'The Island',
      link: 'steam://Connect/salty-gamingclub.spdns.de:27101/1234',
    },
    {
      server: '0',
      name: 'Scorched Earth',
      link: 'steam://Connect/salty-gamingclub.spdns.de:27102/1234',
    },
    {
      server: '0',
      name: 'Aberration',
      link: 'steam://Connect/salty-gamingclub.spdns.de:27103/1234',
    },
    {
      server: '0',
      name: 'Extinction',
      link: 'steam://Connect/salty-gamingclub.spdns.de:27104/1234',
    },
    {
      server: '0',
      name: 'Ragnarok',
      link: 'steam://Connect/salty-gamingclub.spdns.de:27105/1234',
    },
    {
      server: '0',
      name: 'The Center',
      link: 'steam://Connect/salty-gamingclub.spdns.de:27106/1234',
    },
    {
      server: '0',
      name: 'Valguero',
      link: 'steam://Connect/salty-gamingclub.spdns.de:27107/1234',
    },
    {
      server: '0',
      name: 'Genesis',
      link: 'steam://Connect/salty-gamingclub.spdns.de:27108/1234',
    },
    {
      server: '0',
      name: 'Crystal Isles',
      link: 'steam://Connect/salty-gamingclub.spdns.de:27109/1234',
    },
    {
      server: '0',
      name: 'Gen 2',
      link: 'steam://Connect/salty-gamingclub.spdns.de:27110/1234',
    },

    { server: '1', name: 'The Island', link: '' },
    { server: '1', name: 'Scorched Earth', link: '' },
    { server: '1', name: 'Aberration', link: '' },
    { server: '1', name: 'Extinction', link: '' },
    { server: '1', name: 'Ragnarok', link: '' },
    { server: '1', name: 'The Center', link: '' },
    { server: '1', name: 'Valguero', link: '' },
    { server: '1', name: 'Genesis', link: '' },
    { server: '1', name: 'Crystal Isles', link: '' },
    { server: '1', name: 'Gen 2', link: '' },

    { server: '2', name: 'The Island', link: '' },
    { server: '2', name: 'Scorched Earth', link: '' },
    { server: '2', name: 'Aberration', link: '' },
    { server: '2', name: 'Extinction', link: '' },
    { server: '2', name: 'Ragnarok', link: '' },
    { server: '2', name: 'The Center', link: '' },
    { server: '2', name: 'Valguero', link: '' },
    { server: '2', name: 'Genesis', link: '' },
    { server: '2', name: 'Crystal Isles', link: '' },
    { server: '2', name: 'Gen 2', link: '' },

    { server: '3', name: 'The Island', link: '' },
    { server: '3', name: 'Scorched Earth', link: '' },
    { server: '3', name: 'Aberration', link: '' },
    { server: '3', name: 'Extinction', link: '' },
    { server: '3', name: 'Ragnarok', link: '' },
    { server: '3', name: 'The Center', link: '' },
    { server: '3', name: 'Valguero', link: '' },
    { server: '3', name: 'Genesis', link: '' },
    { server: '3', name: 'Crystal Isles', link: '' },
    { server: '3', name: 'Gen 2', link: '' },
  ];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  transform(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
