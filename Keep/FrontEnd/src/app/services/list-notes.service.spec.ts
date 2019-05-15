import { TestBed, inject } from '@angular/core/testing';

import { ListNotesService } from './list-notes.service';

describe('ListNotesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListNotesService]
    });
  });

  it('should be created', inject([ListNotesService], (service: ListNotesService) => {
    expect(service).toBeTruthy();
  }));
});
