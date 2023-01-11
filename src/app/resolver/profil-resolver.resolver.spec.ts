import { TestBed } from '@angular/core/testing';

import { ProfilResolverResolver } from './profil-resolver.resolver';

describe('ProfilResolverResolver', () => {
  let resolver: ProfilResolverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProfilResolverResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
