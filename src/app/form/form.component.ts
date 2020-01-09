import { CPU } from './../_models/cpu.model';
import { DataService } from './../_services/data.service';
import { DropdownService } from './../_services/dropdown.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {

  userForm: FormGroup;


  constructor(
    public dropdown: DropdownService,
    private router: Router,
    private dataService: DataService
    ) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      fullname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z\. ]+')]),
      cpu: new FormGroup({
        brand: new FormControl({value: '', disabled: true}, Validators.required),
        series: new FormControl({value: '', disabled: true}, Validators.required),
        model: new FormControl({value: '', disabled: true}, Validators.required)
      })
    });

    this.dropdown.populateBrandList().subscribe((data) => {
      this.userForm.get('cpu.brand').enable();
    });
  }

  get fullname() {
    return this.userForm.get('fullname');
  }

  get brand() {
    return this.userForm.get('cpu.brand');
  }

  get series() {
    return this.userForm.get('cpu.series');
  }

  get model() {
    return this.userForm.get('cpu.model');
  }

  onNameChange(event) {
    const uppercaseVal = event.target.value.toUpperCase();
    this.fullname.setValue(uppercaseVal);
  }

  onBrandChange(event) {
    const value = event.target.value;
    this.dropdown.populateSeriesList(value).subscribe(resp => {
      if (this.dropdown.seriesList.length !== 0) {
        this.userForm.get('cpu.model').reset(
          {value: '', disabled: true}
        );
        this.userForm.get('cpu.series').reset(
          {value: '', disabled: true}
        );
        this.userForm.get('cpu.series').enable();
      }

    });

  }

  onSeriesChange(event) {
    const value = event.target.value;
    this.dropdown.populateModelList(value).subscribe(resp => {
      if (this.dropdown.modelList.length !== 0) {
        this.userForm.get('cpu.model').reset(
          {value: '', disabled: true}
        );
        this.userForm.get('cpu.model').enable();
      }
    });
  }

  backToHomepage() {
    this.router.navigate(['home']);
  }

  onSubmit() {
    if (this.userForm.valid) {
      const value = this.userForm.value;
      const formIds = value.cpu;
      this.dropdown.getValues(formIds).subscribe((cpuVal: CPU) => {
        value.cpu = cpuVal;
        this.dataService.setUserData(value);
        this.router.navigate(['confirmation']);
      });
    }
  }

}
