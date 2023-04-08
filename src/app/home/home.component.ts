import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Occupation } from '../types/occupation';
import { OccupationService } from '../services/OccupationService';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  selectedOccupation: Occupation | null = null;
  occupations: Occupation[] = [];
  premiumForm!: FormGroup;
  minDate = new Date();
  maxDate = new Date();
  @Output()
  dateChange: EventEmitter<MatDatepickerInputEvent<any>> = new EventEmitter();

  constructor
    (
      private occupationService: OccupationService
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

}
