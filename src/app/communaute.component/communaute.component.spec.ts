import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunauteComponent } from './communaute.component';

describe('CommunauteComponent', () => {
  let component: CommunauteComponent;
  let fixture: ComponentFixture<CommunauteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunauteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunauteComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
