// @ts-check
//import { defineConfig, devices } from '@playwright/test';

import { trace } from "node:console";

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
  //workers: 3,  // para correr los test de forma secuencial, poner a 1, para correr en paralelo, poner a mas de 1  
  use: {
    //browserName: 'chromium',
    //browserName: 'firefox',
    //browserName: 'webkit',
    browserName: 'chromium',
    headless: false,  // true para correr sin mostrar la pantalla, false para mostrarla  
    screenshot: 'on',  // para tomar screenshot
    //trace: 'on', para tomar el trace solo cuando falla el test, es un video que muestra el paso a paso del test, con los logs de cada paso, y los screenshots de cada paso, para poder debuguear el test en caso de que falle   
    trace: 'retain-on-failure',  // para tomar el trace solo cuando falla el test, 
    // es un video que muestra el paso a paso del test, con los logs de cada paso, 
    // //  y los screenshots de cada paso, para poder debuguear el test en caso de que falle  
    // otros valores para trace: 'on', 'off', 'retain-on-failure', 'on-first-retry', 'off-first-retry'
  },

});

export default config;