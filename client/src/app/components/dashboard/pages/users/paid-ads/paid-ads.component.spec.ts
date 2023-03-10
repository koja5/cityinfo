import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidAdsComponent } from './paid-ads.component';

describe('PaidAdsComponent', () => {
  let component: PaidAdsComponent;
  let fixture: ComponentFixture<PaidAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaidAdsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaidAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
