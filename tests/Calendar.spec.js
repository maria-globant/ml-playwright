import { expect, test } from "@playwright/test";

test("Calendar validations", async ({ page }) => {

    const monthNumber = "6"; // Junio
    const year = "2027";
    const date = "15";
    const expectecList = [monthNumber, date, year]

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

    // console.log("Fecha seleccionada:", year, monthNumber, date);

    expect(await page.locator('[name="year"]').inputValue()).toEqual(year);
    expect(await page.locator('[name="month"]').inputValue()).toEqual(monthNumber);
    expect(await page.locator('[name="day"]').inputValue()).toEqual(date);

});