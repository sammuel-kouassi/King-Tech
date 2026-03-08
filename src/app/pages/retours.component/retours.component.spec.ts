import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetoursComponent } from './retours.component';

describe('RetoursComponent', () => {
  let component: RetoursComponent;
  let fixture: ComponentFixture<RetoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RetoursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetoursComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
