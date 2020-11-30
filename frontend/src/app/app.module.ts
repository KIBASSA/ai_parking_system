import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule, HttpClient} from '@angular/common/http';
//import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PredictComponent } from './predict/predict.component';

import { ImageCarPredictorService } from './predict/predict.service'

// AoT requires an exported function for factories
//export function HttpLoaderFactory(http: HttpClient) {
//  return new TranslateHttpLoader(http, './assets/i18n/');
//}

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
    url: 'https://httpbin.org/post',
    maxFilesize: 50,
    acceptedFiles: 'image/*'
};

@NgModule({
  declarations: [
    AppComponent,
    PredictComponent
  ],
  imports: [
    BrowserModule,
    DropzoneModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
    provide: DROPZONE_CONFIG,
    useValue: DEFAULT_DROPZONE_CONFIG
    },
    ImageCarPredictorService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
