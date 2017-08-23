import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoursControlComponent } from './hours-control.component';

describe('HoursControlComponent', () => {
  let component: HoursControlComponent;
  let fixture: ComponentFixture<HoursControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoursControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoursControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
