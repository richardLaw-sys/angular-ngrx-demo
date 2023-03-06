import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error',
  template: `
    <div fxLayout="column" fxLayoutAlign="center center" fxLayoutGap="20px">
      <mat-icon>Error Alert</mat-icon>
      <span>{{ errorTitle }}</span>
      <button (click)="reload.next(true)" mat-raised-button color="warn">
        Try Again
      </button>
    </div>
  `,
  styles: [``],
})
export class ErrorComponent {
  @Output() reload = new EventEmitter();

  @Input() errorTitle?: string;

  constructor() {}
}
