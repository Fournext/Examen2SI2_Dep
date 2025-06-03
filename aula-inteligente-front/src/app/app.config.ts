import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideAnimations(),
    importProvidersFrom(
      FormsModule,
      HttpClientModule,
      BrowserAnimationsModule,         // 👈 Necesario para Toastr
      ToastrModule.forRoot({
        positionClass: 'toast-bottom-right', // 👈 Configuración para abajo-derecha
        timeOut: 3000,                      // Duración de 3 segundos
        preventDuplicates: true,             // Evita mensajes duplicados
        progressBar: true,                  // Barra de progreso opcional
      }),
    ),
  ]
};
