// imports for Angular
import { Component, OnInit } from '@angular/core';
// imports for Microsoft Authentication Library (MSAL)
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, AuthenticationResult } from '@azure/msal-browser';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  constructor(
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) { }

  ngOnInit(): void {
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
      )
      .subscribe((result: EventMessage) => {
        const payload = result.payload as AuthenticationResult;
        this.authService.instance.setActiveAccount(payload.account);
      });
  }
}
