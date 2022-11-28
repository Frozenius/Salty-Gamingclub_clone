import { Component, OnInit } from '@angular/core';
import { SpielService } from '@core/services/spiel.service';
import { ToastService } from '@core/services/toast.service';
import { Spiel } from '@core/interfaces/spiel';

@Component({
  selector: 'sgc-all-games',
  templateUrl: './all-games.component.html',
  styleUrls: ['./all-games.component.scss'],
})
export class AllGamesComponent implements OnInit {
  public spiele: Spiel[];
  public loading = false;
  private dataSource: Spiel[];
  public totalSpiele = 0;

  constructor(private spielService: SpielService, private toastService: ToastService) {
    // this.spielService.spiele$.subscribe(spiele => {
    //   this.dataSource = spiele;
    //   this.spiele = spiele;
    //   this.totalSpiele = spiele.length;
    //   this.loading = false;
    // });
  }

  ngOnInit(): void {
    // this.spielService.initListener();
  }
}
