import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregistrationComponent } from './unregistration.component';

describe('UnregistrationComponent', () => {
  let component: UnregistrationComponent;
  let fixture: ComponentFixture<UnregistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnregistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
