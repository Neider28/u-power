import { provideAnimations } from "@angular/platform-browser/animations";
import { ApplicationConfig, importProvidersFrom, LOCALE_ID  } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import es from '@angular/common/locales/es';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideOAuthClient } from "angular-oauth2-oidc";
import { provideToastr } from "ngx-toastr";

registerLocaleData(en);
registerLocaleData(es);

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideToastr(),
    provideRouter(routes),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideOAuthClient(),
    { provide: LOCALE_ID, useValue: 'es-CO' },
  ],
};
