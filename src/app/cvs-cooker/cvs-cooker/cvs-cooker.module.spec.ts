import { CvsCookerModule } from './cvs-cooker.module';

describe('CvsCookerModule', () => {
  let cvsCookerModule: CvsCookerModule;

  beforeEach(() => {
    cvsCookerModule = new CvsCookerModule();
  });

  it('should create an instance', () => {
    expect(cvsCookerModule).toBeTruthy();
  });
});
