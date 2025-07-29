import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitApprovedComponent } from './submit-approved.component';

describe('SubmitApprovedComponent', () => {
  let component: SubmitApprovedComponent;
  let fixture: ComponentFixture<SubmitApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitApprovedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
