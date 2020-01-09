import { CPU } from './../_models/cpu.model';
import { CpuDropdown } from './../_models/dropdown.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dropdown } from '../_models/dropdown.model';


@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  private dataUrl = environment.dataUrl;

  brandList: Dropdown[] = [];
  seriesList: Dropdown[] = [];
  modelList: Dropdown[] = [];

  constructor(private http: HttpClient) {
  }

  populateBrandList(): Observable<Dropdown[]> {
    return this.http.get<CpuDropdown>(this.dataUrl)
      .pipe(
        map(data => {
          this.brandList = data.brand;
          return data.brand;
        })
      );
  }

  populateSeriesList(brandId: string): Observable<Dropdown[]> {
    return this.http.get<CpuDropdown>(this.dataUrl)
      .pipe(
        map(data => {
          const series = data.series.filter(seriesData => {
            return seriesData.dependency == brandId;
          });
          this.seriesList = series;
          return series;
        })
      );
  }

  populateModelList(seriesId: string): Observable<Dropdown[]> {
    return this.http.get<CpuDropdown>(this.dataUrl)
      .pipe(
        map(data => {
          const model = data.model.filter(modelData => {
            return modelData.dependency == seriesId;
          });
          this.modelList = model;
          return model;
        })
      );
  }

  getValues(formIds: CPU): Observable<CPU> {
    return this.http.get<CpuDropdown>(this.dataUrl)
      .pipe(
        map(data => {
          const cpuVals: CPU = {brand: '', series: '', model: '' };
          cpuVals.brand = data.brand.find(elem => elem.id == formIds.brand).value;
          cpuVals.series = data.series.find(elem => elem.id == formIds.series).value;
          cpuVals.model = data.model.find(elem => elem.id == formIds.model).value;
          return cpuVals;
        })
      );
  }

}
