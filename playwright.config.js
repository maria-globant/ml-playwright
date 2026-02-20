// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
//export default defineConfig({
const config = ({
  testDir: './tests',
  /* Run tests in files in parallel */
  timeout: 40000,
  expect: {
    timeout: 40000
  },
  reporter: 'html',
  use: {
    //browserName: 'chromium',
    //browserName: 'firefox',
    //browserName: 'webkit',
    browserName: 'chromium',
    headless : false,  // true para correr sin mostrar la pantalla, false para mostrarla  
  },

});

export default config;