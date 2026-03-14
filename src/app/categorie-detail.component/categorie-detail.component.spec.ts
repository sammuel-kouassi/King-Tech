import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieDetailComponent } from './categorie-detail.component';

describe('CategorieDetailComponent', () => {
  let component: CategorieDetailComponent;
  let fixture: ComponentFixture<CategorieDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategorieDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieDetailComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
