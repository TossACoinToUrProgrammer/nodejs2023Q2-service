import { UuidValidationPipe } from './user-id-validation.pipe';

describe('UserIdValidationPipe', () => {
  it('should be defined', () => {
    expect(new UuidValidationPipe()).toBeDefined();
  });
});
