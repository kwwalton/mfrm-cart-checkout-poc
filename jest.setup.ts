import fetchMock from 'jest-fetch-mock'
import '@testing-library/jest-dom'
import { TextDecoder, TextEncoder } from 'util'

Object.assign(global, { TextDecoder, TextEncoder })
// Uncomment to run test with enviroment variables
//import dotenv from 'dotenv';
//dotenv.config();
fetchMock.enableMocks()

beforeEach(() => {
  // IMPORTANT: be careful: https://testing-library.com/docs/using-fake-timers/
  jest.useFakeTimers()
})

/***
 * Test helper to simulate wait
 *  ms - milliseconds to wait
 **/
// global.sleep = (ms: number): Promise<unknown> =>
//   new Promise((resolve) => setTimeout(resolve, ms));
