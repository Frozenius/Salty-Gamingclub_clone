import { Component, OnDestroy, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FadeInGrow } from '@public/animations/spielleiter.animation';
import { FadeOutGrow } from '@public/animations/spielleiter.animation';
import { FadeInGrowStagger } from '@public/animations/spielleiter.animation';
import { environment } from '@environment/environment';
import * as Plyr from 'plyr';
import { PlyrComponent } from 'ngx-plyr';
import { HlsjsPlyrDriver } from '@public/driver/hlsjs-plyr-driver/hlsjs-plyr-driver';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'sgc-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss'],
  animations: [FadeInGrow, FadeOutGrow, FadeInGrowStagger],
})
export class LiveComponent implements OnInit, OnDestroy, AfterViewInit {
  dev: boolean = !environment.production;

  lifestream: boolean = false;
  id: string | null;

  // get the component instance to have access to plyr instance
  @ViewChild(PlyrComponent)
  plyr: PlyrComponent;
  // or get it from plyrInit event
  player: Plyr;
  options: Plyr.Options = {
    // captions: { active: true, update: true, language: 'en' },
  };
  poster = 'assets/images/icons/Salty.png';
  videoSources: Plyr.Source[] = [];
  hlsjsDriver = new HlsjsPlyrDriver(true); //autoload

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    console.log(this.route.snapshot.paramMap)
    this.id = this.route.snapshot.paramMap.get('id');
    this.setVideoSource(this.id);
  }

  ngOnInit(): void { }

  ngOnDestroy() { }

  ngAfterViewInit() { }

  played(event: Plyr.PlyrEvent) {
    // console.log('played', event);
  }

  play(): void {
    // this.player.play(); // or
    this.plyr.player.play();
  }

  setVideoSource(id) {
    if (id !== null) {
      this.lifestream = true;
      this.videoSources = [{
        type: 'video',
        src: 'http://salty-gamingclub.de:8085/live/' + this.id + '/index.m3u8',
      }];
    }
  }

  setUrl(id) {
    // Create url and navigate to it without reloading
    if (id !== null) {
      const url = this.router.createUrlTree([], { relativeTo: this.route }).toString() + '/' + id;
      this.router.navigateByUrl(url);
    }
  }
}
