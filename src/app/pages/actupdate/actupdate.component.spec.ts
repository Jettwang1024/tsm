import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActupdateComponent } from './actupdate.component';

describe('ActupdateComponent', () => {
  let component: ActupdateComponent;
  let fixture: ComponentFixture<ActupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActupdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
