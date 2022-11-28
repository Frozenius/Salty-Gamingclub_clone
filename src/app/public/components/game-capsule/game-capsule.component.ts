import { Component, Input, OnInit } from '@angular/core';
import { ThemeService } from '@core/services/theme.service';

@Component({
  selector: 'sgc-game-capsule',
  templateUrl: './game-capsule.component.html',
  styleUrls: ['./game-capsule.component.scss'],
})
export class GameCapsuleComponent implements OnInit {
  dark!: boolean;
  @Input() backgroundLight = 'var(--surface-border)';
  @Input() backgroundDark = 'var(--surface-border)';
  // @Input() game: Steamgame;
  @Input() game: any;

  constructor(private themeService: ThemeService) {
    this.dark = this.themeService.isDarkTheme;
  }

  ngOnInit(): void {}

  ConvertStringToNumber(number: string) {
    return Number(number);
  }

  getBGColor() {
    // console.log("\"" + this.dark + "\"\neig.\t" + (typeof this.dark) + "\njetzt\t" + (typeof Boolean(this.dark)) + "\n" + (Boolean(this.dark) ? "Dark" : "Light"));

    if (this.dark) {
      // console.log(this.backgroundDark)
      return this.backgroundDark;
    } else {
      // console.log(this.backgroundLight)
      return this.backgroundLight;
    }
    //return this.darktheme ? this.backgroundDark : this.backgroundLight;
  }
}
