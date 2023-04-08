import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-mat-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
    message: any;
    age: string;
    name: string;
    tpdPremiumMonthly: string;
    deathPremium: string;

    constructor(
        private dialogRef: MatDialogRef<AlertComponent>,
        @Inject(MAT_DIALOG_DATA) data: any
    ) {
        this.message = { ...data };
        this.age= this.message["age"];
        this.name= this.message["name"];
        this.tpdPremiumMonthly= this.message["tpdPremiumMonthly"];
        this.deathPremium= this.message["deathPremium"];
    }

    closeAlert() {
        this.dialogRef.close();
    }
}
