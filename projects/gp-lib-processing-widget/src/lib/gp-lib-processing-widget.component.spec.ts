import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpLibProcessingWidgetComponent } from './gp-lib-processing-widget.component';

describe('GpLibProcessingWidgetComponent', () => {
  let component: GpLibProcessingWidgetComponent;
  let fixture: ComponentFixture<GpLibProcessingWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpLibProcessingWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpLibProcessingWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
