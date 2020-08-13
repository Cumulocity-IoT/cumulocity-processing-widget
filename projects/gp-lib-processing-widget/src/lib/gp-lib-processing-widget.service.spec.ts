import { TestBed } from '@angular/core/testing';

import { GpLibProcessingWidgetService } from './gp-lib-processing-widget.service';

describe('GpLibProcessingWidgetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GpLibProcessingWidgetService = TestBed.get(GpLibProcessingWidgetService);
    expect(service).toBeTruthy();
  });
});
