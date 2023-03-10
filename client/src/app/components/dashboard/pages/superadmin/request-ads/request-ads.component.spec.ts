import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAdsComponent } from './request-ads.component';

describe('RequestAdsComponent', () => {
  let component: RequestAdsComponent;
  let fixture: ComponentFixture<RequestAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestAdsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
