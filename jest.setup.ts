import '@testing-library/jest-dom'

// Polyfill for crypto.randomUUID
if (typeof crypto === 'undefined') {
  Object.defineProperty(global, 'crypto', {
    value: {
      randomUUID: () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    },
  });
} else if (!crypto.randomUUID) {
  Object.defineProperty(crypto, 'randomUUID', {
    value: () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    configurable: true,
  });
}

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = jest.fn();
