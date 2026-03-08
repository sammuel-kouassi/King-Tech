import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailComponent } from './product-detail.component';
import { provideRouter } from '@angular/router';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial values', () => {
    expect(component.quantity).toBe(1);
    expect(component.activeTab).toBe('description');
    expect(component.activeImage).toBe(component.product.images[0]);
  });

  it('should increase quantity', () => {
    component.increaseQuantity();
    expect(component.quantity).toBe(2);
  });

  it('should decrease quantity but not below 1', () => {
    component.increaseQuantity();
    component.decreaseQuantity();
    expect(component.quantity).toBe(1);
    component.decreaseQuantity();
    expect(component.quantity).toBe(1);
  });

  it('should change active tab', () => {
    component.setActiveTab('features');
    expect(component.activeTab).toBe('features');
  });

  it('should change active image', () => {
    const secondImage = component.product.images[1];
    component.changeImage(secondImage);
    expect(component.activeImage).toBe(secondImage);
  });
});
