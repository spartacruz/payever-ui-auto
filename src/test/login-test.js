let loginPage = require('../pages/login-page.js');
let testData = require('../data/test-data.js');
let dashboardPage = require('../pages/dashboard-page.js');

const expect = require('chai').expect;
const assert = require('chai').assert;

describe('Login Page Test', function() {
    beforeEach(async function() {
    });

    afterEach(async function() {
        await loginPage.closeBrowser()
        await loginPage.refreshSession()
        await testData.refreshEmail()
        sleep(2)
    });

    after(async function(){
        await loginPage.closeBrowser()
    });

    it.only('TestCase 1 - Fashion', async function() {
        await loginPage.goToPage("fashion");
        expect(await validateFirstScreen(loginPage)).equal(true);
        await loginPage.inputFirstAndLastNameField(testData.firstName, testData.lastName);
        await loginPage.inputEmailField(testData.email);
        await loginPage.inputPasswordField(testData.password);      
        await loginPage.clickSignUpBtn();

        expect(await validateSecondScreen(loginPage)).equal(true);
        await loginPage.inputCompanyName(testData.companyName);
        await loginPage.inputPhoneNumber(testData.phoneNumber);
        await loginPage.clickSignUpBtn();

        expect(await validateFirstScreenDashboard(dashboardPage)).equal(true);
        await dashboardPage.clickGetStartedWelcomeScreen();

        // expect(await validateDashboardApps(dashboardPage)).equal(true);

        await sleep(5);
    });

    async function validateFirstScreenDashboard(pageObject){
        const pageVariables = await pageObject.elementPageVariablesFirstScreen();
        for (const variable of pageVariables) {
            expect(await pageObject.isElementVisible(variable), `"${variable}" is not found `).equal(true);
        }
        return true
    }

    async function validateFirstScreen(pageObject){
        const pageVariables = await pageObject.elementPageVariablesFirstScreen();
        for (const variable of pageVariables) {
            expect(await pageObject.isElementLocated(variable), `"${variable}" is not found `).equal(true);
        }
        expect(await pageObject.isElementVisible(pageObject.loginTitle)).equal(true)
        expect(await pageObject.isElementVisible(pageObject.signUpForFreeBtn)).equal(true)
        expect(await pageObject.isElementVisible(pageObject.loginBtn)).equal(true)
        return true
    }

    async function validateSecondScreen(pageObject){
        const pageVariables = await pageObject.elementPageVariablesSecondScreen();
        for (const variable of pageVariables) {
            expect(await pageObject.isElementLocated(variable), `"${variable}" is not found `).equal(true);
        }
        expect(await pageObject.isElementVisible(pageObject.gettingStartedWithPayever)).equal(true);
        return true
    }

    it('TestCase 1 - Santander', async function() {
        await loginPage.goToPage("santander");
        await sleep(2);
    });

    function sleep(second) {
        return new Promise(resolve => setTimeout(resolve, second*1000));
    }

});
