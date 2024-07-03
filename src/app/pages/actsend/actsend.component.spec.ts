import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActsendComponent } from './actsend.component';

describe('ActsendComponent', () => {
  let component: ActsendComponent;
  let fixture: ComponentFixture<ActsendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActsendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActsendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
