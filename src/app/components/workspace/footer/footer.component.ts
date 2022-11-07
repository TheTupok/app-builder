import {Component, OnInit} from '@angular/core';
import {InfoModalComponent} from "../../modals/info-modal/info-modal.component";
import {WorkingFieldComponent} from "../working-field/working-field.component";
import {PageService} from "../../../services/page.service";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {ParserHTMLService} from "../../../services/parseHtmlToPdf.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  footerForm: FormGroup
  language = environment.defaultLocale

  constructor(private workingFieldComponent: WorkingFieldComponent,
              public pageService: PageService,
              public dialog: MatDialog,
              private fb: FormBuilder,
              private translateService: TranslateService,
              public parseHTMLService: ParserHTMLService
  ) {
  }

  ngOnInit(): void {
    this._createFooterForm()

    this.pageService.getNumberPage().subscribe((data: number) => {
      this.footerForm.controls['listPage'].setValue(data)
    })

    this.footerForm.controls['language'].valueChanges
      .subscribe(newValue => {
        this.language = newValue
        this.translateService.use(this.language)
      })

    this.footerForm.controls['listPage'].valueChanges
      .subscribe(newValue => {
        if (this.pageService.scrolledPage) {
          this.pageService.scrollPage(newValue)
        }
      })
  }

  private _createFooterForm() {
    this.footerForm = this.fb.group({
      language: 'en',
      listPage: '1'
    })
  }

  createNewPage() {
    this.workingFieldComponent.createNewPage()
  }

  openDialogInfo() {
    this.dialog.open(InfoModalComponent, {
      height: '95%',
    });
  }

  toPDF() {
    this.parseHTMLService.parseHtmlToPdf()
  }
}
