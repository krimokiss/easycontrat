import { TestBed } from '@angular/core/testing';

import { ContratResolverResolver } from './contrat-resolver.resolver';

describe('ContratResolverResolver', () => {
  let resolver: ContratResolverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ContratResolverResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
