import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideServerRendering } from '@angular/platform-server';

const bootstrap = () => bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routes),
        provideHttpClient(withFetch()),
        provideServerRendering()
  ]
});

export default bootstrap;
