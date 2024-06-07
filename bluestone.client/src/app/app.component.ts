import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, AuthenticationResult } from '@azure/msal-browser';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'BlueStone';
  loggedIn = false;
  constructor(private http: HttpClient, private broadcastService: MsalBroadcastService, private authService: MsalService) {}

  ngOnInit() {
    this.checkAccount();

    this.broadcastService.msalSubject$
      .pipe(
         filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS)
      )
      .subscribe(() => {
        this.checkAccount()
      })
  }

  checkAccount() {
    try {
      let allAccounts = this.authService.instance.getAllAccounts();
      if (allAccounts.length >= 1) {
        const request = { scopes: ["product-stock-order-readwrite-access"] };
        const silentToken = this.authService.acquireTokenSilent(request);
        if (silentToken !== null) {
          this.loggedIn = true;
        }
      }
    } catch (e) {
      this.loggedIn = false;
      this.authService.loginPopup();
    }
  }

  login() {
    this.authService.loginPopup();
  }

  logout() {
    this.authService.logout();
  }
}
