import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actupdate, Actupdatetable } from '../model/actupdate';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-actupdate',
  templateUrl: './actupdate.component.html',
  styleUrls: ['./actupdate.component.scss']
})
export class ActupdateComponent implements OnInit {
  actForm: FormGroup;
  actupdatetable: Actupdatetable[] = [];
  targetOptions: any[] = [];
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient) {
    this.actForm = this.fb.group({
      activityNumber: ['A001'],
      activityName: ['註冊禮'],
      mileage: ['5'],
      productNumber: ['01240004道路救援'],
      postingDate: ['2024-06-01'],
      receivingStartDate: ['2024-06-05'],
      receivingEndDate: ['2024-06-10'],
      expiryStartDate: ['2024-12-01'],
      expiryEndDate: ['2024-12-31'],
      imageName: ['summer_sale.png'],
      description: ['Join our Summer Sale event and earn 1000 miles!'],
      testCheckbox: [false],
      targets: this.fb.array([]) // 初始化為空數組，稍後動態添加控件
    });
  }

  ngOnInit() {
    this.loadact();
    this.loadTargetOptions();
  }

  get targets(): FormArray {
    return this.actForm.get('targets') as FormArray;
  }

  loadTargetOptions() {
    this.http.get<any[]>('/assets/api/targetOptions.json').subscribe(data => {
      this.targetOptions = data;
      this.targetOptions.forEach((option) => {
        this.targets.push(this.fb.control(false));
      });
    }, error => {
      console.error('Error loading target options:', error);
    });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.actForm.patchValue({ imageName: file.name });
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  save() {
    // 保存邏輯
  }

  cancel() {
    // 取消邏輯
  }

  uploadExcel() {
    // 上傳匯入Excel邏輯
  }

  downloadExcel() {
    // 下載Excel格式邏輯
  }

  insert() {
    this.router.navigate(['/pages/setmileage']); // 替換為實際的路由路徑
  }

  loadact() {
    this.http.get<Actupdatetable[]>('/assets/api/actupdate.json').subscribe(data => {
      if (Array.isArray(data)) {
        this.actupdatetable = data;
      } else if (data && typeof data === 'object') {
        this.actupdatetable = [data];
      } else {
        console.error('Invalid data format:', data);
      }
    }, error => {
      console.error('讀取錯誤訊息:', error);
    });
  }
}
