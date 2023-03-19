import { Component, Inject } from '@angular/core';
import {
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
  MsalService,
  MsalBroadcastService,
} from '@azure/msal-angular';
import {
  EventMessage,
  EventType,
  InteractionStatus,
  InteractionType,
  PopupRequest,
  AuthenticationResult,
  RedirectRequest,
} from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary" style="height: 85px; padding: 0 16px;">
      <div fxLayoutAlign="start center" fxFlex="100%" fxHide.xs>
        <button
          mat-button
          routerLink=""
          [routerLinkActiveOptions]="{ exact: true }"
          routerLinkActive="selected"
        >
          Users
        </button>
        <button mat-button routerLink="/post" routerLinkActive="selected">
          Posts
        </button>
      </div>
      <span *ngIf="loginDisplay" style="padding:10px;"
        >Welcome {{ userName }}!</span
      >
      <button mat-raised-button *ngIf="!loginDisplay" (click)="login()">
        Login
      </button>
      <button mat-raised-button *ngIf="loginDisplay" (click)="logout()">
        Logout
      </button>
    </mat-toolbar>
  `,
  styles: [
    `
      .selected {
        background: #3c763d;
      }
    `,
  ],
})
export class HeaderComponent {
  loginDisplay: boolean = false;
  userName?: string = '';
  isIframe = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {}

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;
    this.setLoginDisplay();

    this.authService.instance.enableAccountStorageEvents();

    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.ACCOUNT_ADDED ||
            msg.eventType === EventType.ACCOUNT_REMOVED
        )
      )
      .subscribe((result: EventMessage) => {
        if (this.authService.instance.getAllAccounts().length === 0) {
          window.location.pathname = '/';
        } else {
          this.setLoginDisplay();
        }
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
      });
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
    this.userName = this.authService.instance.getAllAccounts()[0].name;
  }

  checkAndSetActiveAccount() {
    let activeAccount = this.authService.instance.getActiveAccount();

    if (
      !activeAccount &&
      this.authService.instance.getAllAccounts().length > 0
    ) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }

  login() {
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      if (this.msalGuardConfig.authRequest) {
        this.authService
          .loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
      } else {
        this.authService
          .loginPopup()
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
      }
    } else {
      if (this.msalGuardConfig.authRequest) {
        this.authService.loginRedirect({
          ...this.msalGuardConfig.authRequest,
        } as RedirectRequest);
      } else {
        this.authService.loginRedirect();
      }
    }
  }

  logout() {
    const activeAccount =
      this.authService.instance.getActiveAccount() ||
      this.authService.instance.getAllAccounts()[0];

    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      this.authService.logoutPopup({
        account: activeAccount,
      });
    } else {
      this.authService.logoutRedirect({
        account: activeAccount,
      });
    }
  }

  // unsubscribe to events when component is destroyed
  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
