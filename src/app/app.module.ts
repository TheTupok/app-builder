import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainPageComponent} from './pages/main-page.component/main-page.component';
import {ElementAreaComponent} from './components/workspace/element-area/element-area.component';
import {WorkingFieldComponent} from './components/workspace/working-field/working-field.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DragDropModule} from "@angular/cdk/drag-drop";
import { RenderingDOMComponent } from './components/rendering-dom/rendering-dom.component';
import { ContextMenuComponent } from './components/modals/context-menu/context-menu.component';
import { PropertiesComponent } from './components/modals/properties/properties.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ElementAreaComponent,
    WorkingFieldComponent,
    RenderingDOMComponent,
    ContextMenuComponent,
    PropertiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule
  ],
  providers: [RenderingDOMComponent, ContextMenuComponent, PropertiesComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
