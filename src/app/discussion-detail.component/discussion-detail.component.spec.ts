import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionDetailComponent } from './discussion-detail.component';

describe('DiscussionDetailComponent', () => {
  let component: DiscussionDetailComponent;
  let fixture: ComponentFixture<DiscussionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiscussionDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscussionDetailComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
