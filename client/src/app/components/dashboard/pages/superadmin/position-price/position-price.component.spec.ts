import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionPriceComponent } from './position-price.component';

describe('PositionPriceComponent', () => {
  let component: PositionPriceComponent;
  let fixture: ComponentFixture<PositionPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionPriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
