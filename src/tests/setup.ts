// src/tests/setup.ts
import { vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock des fonctionnalités globales
vi.mock('$lib', () => ({
  pb: {
    collection: vi.fn().mockReturnValue({
      authWithPassword: vi.fn().mockResolvedValue({}),
    }),
  },
}));

vi.mock('$app/navigation', () => ({
  goto: vi.fn(),
}));
