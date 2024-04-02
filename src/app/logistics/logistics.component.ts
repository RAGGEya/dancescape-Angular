import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogisticService } from "src/app/Services/logistic.service";
import { Logistics } from '../Models/logistic';

@Component({
  selector: 'app-logistics',
  templateUrl: './logistics.component.html',
  styleUrls: ['./logistics.component.css']
})
export class LogisticsComponent {

  logistics: Logistics[] = [];
  editingLogistic: Logistics | null = null;
  logisticForm: FormGroup;

  constructor(private fb: FormBuilder, private logisticService: LogisticService) {
    this.logisticForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  loadLogistics(): void {
    this.logisticService.findAllLogistics().subscribe(
      (logistics: Logistics[]) => {
        this.logistics = logistics;
      });
  }

  addLogistic(): void {
    if (this.logisticForm.valid) {
      const newLogistic: Logistics = this.logisticForm.value as Logistics;
      this.logisticService.addLogistic(newLogistic).subscribe(() => {
        this.loadLogistics();
        this.logisticForm.reset();
      });
      alert("Logistic added !");
    } else {
      alert("Logistic not added !");
    }
  }

  ngOnInit(): void {
    this.loadLogistics();
  }

  cancelEdit(): void {
    this.logisticForm.reset();
  }

  deleteLogistic(logisticsId: number): void {
    this.logisticService.deleteLogistic(logisticsId).subscribe(
      () => {
        this.loadLogistics();
      }
    );
  }

  updateLogistic(): void {
    if (this.editingLogistic && this.logisticForm.valid) {
      const updatedLogistic: Logistics = {
        ...this.editingLogistic,
        ...this.logisticForm.value
      } as Logistics;
      this.logisticService.addLogistic(updatedLogistic).subscribe(() => {
        this.loadLogistics();
        this.logisticForm.reset();
        this.editingLogistic = null;
      });
    }
  }

  editLogistic(logistic: Logistics): void {
    this.editingLogistic = logistic;
    this.logisticForm.patchValue({
      name: logistic.name,
      type: logistic.type,
    });
  }

}
