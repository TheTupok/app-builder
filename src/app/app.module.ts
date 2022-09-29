import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainPageComponent} from './pages/main-page.component/main-page.component';
import {ElementAreaComponent} from './components/workspace/element-area/element-area.component';
import {WorkingFieldComponent} from './components/workspace/working-field/working-field.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatBadgeModule} from "@angular/material/badge";
import {PropertiesComponent} from './components/workspace/properties/properties.component';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {LabelComponent} from './components/elements/label/label.component';
import {ContainerComponent} from './components/elements/container/container.component';
import {ButtonComponent} from './components/elements/button/button.component';
import {InputComponent} from './components/elements/input/input.component';
import {TextareaComponent} from './components/elements/textarea/textarea.component';
import {MatButtonModule} from "@angular/material/button";
import {InfoModalComponent} from './components/modals/info-modal/info-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {SelectComponent} from './components/elements/select/select.component';
import {ImageComponent} from './components/elements/image/image.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgClickOutsideDirective} from "ng-click-outside2";
import {A4PageComponent} from './components/page/a4-page/a4-page.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { FooterComponent } from './components/workspace/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ElementAreaComponent,
    WorkingFieldComponent,
    PropertiesComponent,
    LabelComponent,
    ContainerComponent,
    ButtonComponent,
    InputComponent,
    TextareaComponent,
    InfoModalComponent,
    SelectComponent,
    ImageComponent,
    A4PageComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatBadgeModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    FontAwesomeModule,
    NgClickOutsideDirective,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      useDefaultLang: false,
    })
  ],
  providers: [FormBuilder, WorkingFieldComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/locale/', '.json');
}
