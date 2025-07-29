import {test, expect} from '@playwright/test'

test.describe('Assertions', () => {
    test('Verify web page behavior', async ({page}) => {
        await page.goto('https://the-internet.herokuapp.com/')

        // to have URL
        await expect(page).toHaveURL('https://the-internet.herokuapp.com/')

        // to have a title
        await expect(page).toHaveTitle('The Internet')
    })

    test('Assertions part 2', async ({page}) => {
        await page.goto('https://the-internet.herokuapp.com/')
        //assert visibility
        await expect(page.locator('h1')).toBeVisible()

        //assert element to have text
        await expect(page.locator('h2')).toHaveText('Available Examples')

        //assert contains text
        await expect(page.locator('body')).toContainText('WYSIWYG')
    })

    test('Assertions part 3', async ({page}) => {
        await page.goto('https://the-internet.herokuapp.com/')

        //assert count
        await expect(page.locator('a')).toHaveCount(46)

        //elements to be checked 
        await page.goto('https://the-internet.herokuapp.com/checkboxes')   

        //waits
        await page.waitForTimeout(1000)
        await page.waitForLoadState('networkidle')
        
        let checkbox = await page.getByRole('checkbox').nth(0)
        await checkbox.waitFor()

        await page.getByRole('checkbox').nth(0).check(); // first checkbox
        await page.getByRole('checkbox').nth(1).uncheck(); // second checkbox

        await expect(page.getByRole('checkbox').nth(0)).toBeChecked()
        await expect(page.getByRole('checkbox').nth(1)).not.toBeChecked()  

    })

    test('Assertions part 4', async ({page}) => {
        await page.goto('https://the-internet.herokuapp.com/login')

        // have value
        await page.locator('#username').fill('tomsmith')
        await expect(page.locator('#username')).toHaveValue('tomsmith')

        // element is enabled
        await expect(page.locator('button[type="submit"]')).toBeEnabled()
    })

    test('Assertions part 5', async ({page}) => {

        await page.goto('https://the-internet.herokuapp.com/')

        // store text in variable and then verify content
        const headerText = await page.locator('h1').textContent()
        expect(headerText).toBe('Welcome to the-internet')
    })

})