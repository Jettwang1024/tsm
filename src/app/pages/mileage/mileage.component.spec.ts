import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MileageComponent } from './mileage.component';

describe('MileageComponent', () => {
  let component: MileageComponent;
  let fixture: ComponentFixture<MileageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MileageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MileageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
