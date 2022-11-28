import { Inject, Injectable, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ScriptService {
  constructor(@Inject(DOCUMENT) private document: Document) {}
}
