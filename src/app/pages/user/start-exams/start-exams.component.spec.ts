import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartExamsComponent } from './start-exams.component';

describe('StartExamsComponent', () => {
  let component: StartExamsComponent;
  let fixture: ComponentFixture<StartExamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartExamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
