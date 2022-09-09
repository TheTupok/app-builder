import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponentComponent } from './pages/main-page.component/main-page.component.component';
import { ElementAreaComponent } from './components/workspace/element-area/element-area.component';
import { WorkingFieldComponent } from './components/workspace/working-field/working-field.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DragDropModule} from "@angular/cdk/drag-drop";
import { PropertiesComponentTsComponent } from './components/workspace/properties.component.ts/properties.component.ts.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponentComponent,
    ElementAreaComponent,
    WorkingFieldComponent,
    PropertiesComponentTsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
