import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadExamUserComponent } from './load-exam-user.component';

describe('LoadExamUserComponent', () => {
  let component: LoadExamUserComponent;
  let fixture: ComponentFixture<LoadExamUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadExamUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadExamUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
