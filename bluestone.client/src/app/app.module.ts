import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MsalModule, MsalService, MsalGuard, MsalInterceptor, MsalBroadcastService, MsalRedirectComponent } from "@azure/msal-angular";
import { PublicClientApplication, InteractionType, BrowserCacheLocation } from "@azure/msal-browser";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MsalModule.forRoot(new PublicClientApplication({
      auth: {
        clientId: "8a2322fa-2fab-4830-98db-2aa9e984fddb",
        authority: "https://login.microsoftonline.com/6a1d4ff8-12a9-4e07-b7b5-14c14510ec10",
        redirectUri: "https://localhost:4200/"
      },
      cache: {
        cacheLocation: BrowserCacheLocation.SessionStorage,
        storeAuthStateInCookie: true
      },            
    },
    ), {
      interactionType: InteractionType.Popup,
      authRequest: {
        scopes: ['product-stock-order-readwrite-access']
      },
      loginFailedRoute: "/login-failed"
    }, {
      interactionType: InteractionType.Redirect,
      protectedResourceMap: new Map<string, Array<string> | null>([
        ["https://graph.microsoft.com/v1.0/me", ["product-stock-order-readwrite-access"]],
        ["https://localhost:7046/api/Product/all", ["api://8a2322fa-2fab-4830-98db-2aa9e984fddb/product-stock-order-readwrite-access"]]
      ]),
    }),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalGuard
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
