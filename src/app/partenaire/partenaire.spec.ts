import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Partenaire } from './partenaire';

describe('Partenaire', () => {
  let component: Partenaire;
  let fixture: ComponentFixture<Partenaire>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Partenaire]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Partenaire);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
