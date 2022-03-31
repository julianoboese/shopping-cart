function localStorageSimulator(key) {
  Object.defineProperty(global, 'localStorage', {
    value: {
      [key]: jest.fn(),
    },
  });
}

afterEach(jest.clearAllMocks);

module.exports = localStorageSimulator;
