import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandrecordComponent } from './landrecord.component';

describe('LandrecordComponent', () => {
  let component: LandrecordComponent;
  let fixture: ComponentFixture<LandrecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandrecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandrecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
