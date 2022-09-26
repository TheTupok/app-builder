import {Component, OnInit} from '@angular/core';
import {DragsService} from "../../services/drags-component.service";
import {WorkingFieldComponent} from "../../components/workspace/working-field/working-field.component";
import {PropertiesService} from "../../services/property.service";
import {InfoModalComponent} from "../../components/modals/info-modal/info-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {environment} from "../../../environments/environment";


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  localizationForm: FormGroup

  language = environment.defaultLocale

  constructor(
    public dragsService: DragsService,
    public workingFieldComponent: WorkingFieldComponent,
    private propertiesService: PropertiesService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private translateService: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.propertiesService.closePanel()
    this._createLocalizationForm()

    this.localizationForm.controls['language'].valueChanges
      .subscribe(newValue => {
        console.log(newValue)
        this.language = newValue
        this.translateService.use(this.language)
      })
  }

  private _createLocalizationForm() {
    this.localizationForm = this.fb.group({
      language: 'en'
    })
  }

  public mouseClickEventComponent(event: MouseEvent) {
    if (event.button == 0) {
      const target = event.target as HTMLElement;
      if (target.classList.contains('sample')) {
        const newTarget = this.workingFieldComponent.renderComponent(target)
        this.dragsService.DragAndDrop(event, newTarget)
      }
    }
  }

  createNewPage() {
    this.workingFieldComponent.createNewPage()
  }

  openDialogInfo() {
    this.dialog.open(InfoModalComponent);
  }

  mouseDown() {
    this.propertiesService.closePanel()
  }
}
