export interface Verification {
  task: string;
  column: string;
  tags: string[];
}

export interface TestCase {
  name: string;
  feature: string;
  verifications: Verification[];
}
