// addDelete.test.js

// import myApp from './functionality.js'; // Import the function you want to test

const myApp = require('./functionality.js');

// Mock localStorage for testing
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

describe('removeTask', () => {
  it('should remove a task from savedLists', () => {
    expect(myApp.length).toBe(0);
  });
});

describe('AddNewTask', () => {
  it('should add a new task to savedLists', () => {
    // expect(myApp.length).toBe(myApp.length  + 1)
  });
});
