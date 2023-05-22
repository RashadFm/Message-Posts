import { TestBed } from '@angular/core/testing';

import { PostDataManagerService } from './post-data-manager.service';

describe('PostDataManagerService', () => {
  let service: PostDataManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostDataManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
