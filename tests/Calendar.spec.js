import { expect, test } from "@playwright/test";

// para hacer una corrida con degug: npx playwright test --calendar.spec.js --debug
// se pueden seleccionar locators, diferentes a los que vienen del flujo,  
// te muestra el valor del locator en el momento de la corrida
// se puede chequear en el runtime si hay mas de un locator con ese valor
//
// Como grabar la prueba: npx playwright codegen https://rahulshettyacademy.com/seleniumPractise/#/offers
// Es la url donde vos queres que comience a grabar
// esta generando el codigo a media que vas navegando x la aplicacion, y lo va mostrando en la consola
//


test("Calendar validations", async ({ page }) => {

    const monthNumber = "6"; // Junio
    const year = "2027";
    const date = "15";

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    await page.locator(".react-date-picker__inputGroup").click();

    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();

    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber) - 1).click();
    // await page.getByText(date).click();

    //await page.getByRole('button', { name: '15' }).click();
    //. //abbr[tex[text()='15']]

    //await page.locator(`//abbr[text()='${date}']`).click();
    await page.locator('.react-calendar__month-view').getByRole('button', { name: date }).click();

    console.log("Fecha seleccionada:", year, monthNumber, date);

    console.log("Fecha mostrada Año:", await page.locator('[name="year"]').inputValue())
    console.log("Fecha mostrada Mes:", await page.locator('[name="month"]').inputValue())
    console.log("Fecha mostrada Día:", await page.locator('[name="date"]').inputValue())

    expect(await page.locator('[name="year"]').inputValue()).toBe(year);
    expect(await page.locator('[name="month"]').inputValue()).toBe(monthNumber);
    expect(await page.locator('[name="day"]').inputValue()).toBe(date);








    // .react-date-picker__wrapper
});