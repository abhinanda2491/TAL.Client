import { Component, OnInit } from '@angular/core';
import { Occupation } from '../types/occupation';
import { OccupationService } from '../services/OccupationService';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  selectedOccupation: Occupation | null = null;
  occupations: Occupation[] = [];

  constructor(private occupationService: OccupationService) { }

  ngOnInit(): void {
    this.occupationService.getOccupations().subscribe(
      (occupations) => {
        this.occupations = occupations;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
