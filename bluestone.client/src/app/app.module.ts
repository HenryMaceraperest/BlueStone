// Required for Angular multi-browser support
import { BrowserModule } from '@angular/platform-browser';

// Required for Angular
import { NgModule } from '@angular/core';

// Required modules and components for this application
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { msalEnvironment, environment } from '../environments/environment';

// HTTP modules required by MSAL
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// Required for MSAL
import { IPublicClientApplication, PublicClientApplication, InteractionType, BrowserCacheLocation, LogLevel } from '@azure/msal-browser';
import { MsalGuard, MsalInterceptor, MsalBroadcastService, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalGuardConfiguration, MsalRedirectComponent } from '@azure/msal-angular';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductsComponent } from './products/products.component';
import { AboutComponent } from './about/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductAddEditComponent } from './products/product-add-edit/product-add-edit.component';
import { CurrencyPipe } from '@angular/common';
import { CurrencyFormatterDirective } from './common/CurrencyFormatter.directive';
import { ProductViewComponent } from './products/product-view/product-view.component';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

export function MSALInstanceFactory(): IPublicClientApplication {
  msalEnvironment.cache.storeAuthStateInCookie = isIE;
  return new PublicClientApplication(msalEnvironment);
}

// MSAL Interceptor is required to request access tokens in order to access the protected resource (Graph)
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(environment.auth.microsoftGraphUri, [environment.auth.graphScope]);

  return {
    interactionType: InteractionType.Popup,
    protectedResourceMap
  };
}

// MSAL Guard is required to protect routes and require authentication before accessing protected routes
export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Popup,
    authRequest: {
      scopes: ['user.read']
    }
  };
}

// Create an NgModule that contains the routes and MSAL configurations
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    NavbarComponent,
    ProductsComponent,
    AboutComponent,
    ProductAddEditComponent,
    CurrencyFormatterDirective,
    ProductViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    CurrencyPipe
  ],
  bootstrap: [AppComponent, MsalRedirectComponent],
  exports: [
    HomeComponent,
    ProfileComponent,
    NavbarComponent,
    ProductsComponent,
    AboutComponent,
    CurrencyFormatterDirective
  ]
})
export class AppModule { }
