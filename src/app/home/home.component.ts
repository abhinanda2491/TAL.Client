import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Occupation } from '../types/occupation';
import { PremiumRequest } from '../types/premiumRequest';
import { OccupationService } from '../services/OccupationService';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  @Output()
  dateChange: EventEmitter<MatDatepickerInputEvent<any>> = new EventEmitter();
  selectedOccupation: Occupation | null = null;
  occupations: Occupation[] = [];
  premiumForm!: FormGroup;
  minDate = new Date();
  maxDate = new Date();

  constructor
    (
      private occupationService: OccupationService,
      private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.setMinDatepickerDate();
    this.GetOccupations();
    this.formValidationBuilder();

  }

  formValidationBuilder() {
    this.premiumForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      sumInsured: new FormControl('', [Validators.required, Validators.pattern(/^[.\d]+$/)])
    });
  }

  setMinDatepickerDate() {
    const today = new Date();
    this.minDate = new Date(today.getFullYear() - 70, today.getMonth(), today.getDate());
  }

  public errorHandling = (control: string, error: string) => {
    return this.premiumForm.controls[control].hasError(error);
  }

  onDateChange(value: any): void {
    const age = this.getAgeFromDateOfBirth(value);
    var ageInput = (<HTMLInputElement>document.getElementById('Age'));
    ageInput.value = age.toString();
  }

  getAgeFromDateOfBirth(dateOfBirth: Date): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  calculatePremium(event: any) {
    const age = (<HTMLInputElement>document.getElementById('Age')).value;
    const sumInsured = this.premiumForm.controls['sumInsured'].value;
    const factor = event.factor;

    var requestObj = new PremiumRequest();
    requestObj.age = age;
    requestObj.occupationRating = factor.toString();
    requestObj.sumInsured = sumInsured.toString();
    var requestBody = JSON.stringify(requestObj);
    this.occupationService.calculatePremium(requestBody).subscribe({
      next: (response: any) => {
        this.openDialog(response, age);
      },
      error(err) {
        console.log(err);
      },
    });
  }

  private GetOccupations() {
    this.occupationService.getOccupations().subscribe(
      {
        next: (occupations) => {
          this.occupations = occupations;
        },
        error(err) {
          console.log(err)
        },
      }
    );
  }

  openDialog(response: any, age: string) {
    this.dialog.open(
      AlertComponent,
      {
        width: '500px',
        height: '240px',
        data: {
          "deathPremium": response["deathPremium"],
          "tpdPremiumMonthly": response["tpdPremiumMonthly"],
          "age": age,
          "name": this.premiumForm.controls['name'].value
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );
  }

}
