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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatBadgeModule,
    ReactiveFormsModule
  ],
  providers: [FormBuilder, WorkingFieldComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
