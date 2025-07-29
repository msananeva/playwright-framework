import {test, expect} from '@playwright/test'

// To check if it is an unique id: Inspect > Console > $$('#example')
// True if len == 1 

test("Selectors", async ({page}) => {
    //navigate to the webpage
    await page.goto('http://127.0.0.1:5500/clickMe.html')

    // by ID
    await page.locator('#clickButton').click()

    // by Class
    await page.locator('.button-style').click()

    // by Tag and Class
    await page.locator('button.button-style').click()

    // by Attribute Value
    await page.locator('[data-action="increment"]').click() //OR
    await page.locator('[id="clickButton"]').click()

    // by Partial Attribute
    await page.locator('[role*="but"]').click()

    // by Text visible to the user
    await page.locator('text=CLICK ME').click()

    // combine selectors, class and text - exact text match
    await page.locator('.button-style:text("CLICK ME")').click()

    // find elemnts containing specific text, has-text
    await page.locator('button:has-text("click m")').click()

    // by Attribute in Text
    await page.locator('[data-action="increment"]:text("CLICK ME")').click()

    // playwright locators https://playwright.dev/docs/locators
    // by text
    await page.getByText('CLICK ME').click()

    // by role
    await page.getByRole('button', { name: /click me/i }).click()

    // assert the counter
    await expect(page.locator('#counter')).toContainText('12')

})