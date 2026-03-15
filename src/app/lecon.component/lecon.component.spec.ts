import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeconComponent } from './lecon.component';

describe('LeconComponent', () => {
  let component: LeconComponent;
  let fixture: ComponentFixture<LeconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeconComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
