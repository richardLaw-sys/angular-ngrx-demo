import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: ` <router-outlet *ngIf="!isIframe"></router-outlet>`,
  styles: [``],
})
export class AppComponent implements OnInit {
  title = 'Angular-NgRx';
  isIframe = false;

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;
  }
}
