import { trigger, style, animate, transition, query, group, stagger } from '@angular/animations';

export const FadeInGrow = trigger('fadeInGrow', [
  transition(':enter', [style({ transform: 'scale(0.95)', opacity: 0 }), animate('250ms', style({ transform: 'scale(1)', opacity: 1 }))]),
]);
export const FadeOutGrow = trigger('fadeOutGrow', [
  transition(':leave', [style({ transform: 'scale(1)', opacity: 1 }), animate('250ms', style({ transform: 'scale(0.95)', opacity: 0 }))]),
]);

// https://indepth.dev/posts/1285/in-depth-guide-into-animations-in-angular
export const FadeInGrowStagger = trigger('fadeInGrowStagger', [
  transition('* => *', [query(':enter', [style({ transform: 'scale(0.95)', opacity: 0 }), stagger(1000, [animate('250ms', style({ transform: 'scale(1)', opacity: 1 }))])], { optional: true })]),
]);
