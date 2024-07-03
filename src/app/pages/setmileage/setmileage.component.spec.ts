import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetmileageComponent } from './setmileage.component';

describe('SetmileageComponent', () => {
  let component: SetmileageComponent;
  let fixture: ComponentFixture<SetmileageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetmileageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetmileageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
