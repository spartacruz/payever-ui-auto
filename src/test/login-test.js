let varLoginPage = require('../pages/login-page.js');
let testData = require('../data/test-data.js');
let varDashboardPage = require('../pages/dashboard-page.js');
let varBasePage = require('../pages/base-page.js');

const expect = require('chai').expect;
const assert = require('chai').assert;
let loginPage = {}
let dashboardPage = {}

describe('Login Page Test', function() {
    beforeEach(async function() {
        basePage = new varBasePage()
        loginPage = new varLoginPage(basePage.driver)
        dashboardPage = new varDashboardPage(basePage.driver)
    });

    afterEach(async function() {
        // basePage.closeBrowser();
    });

    after(async function(){
        // basePage.closeBrowser();
    });

    it('TestCase 1 - Fashion', async function() {
        await loginPage.goToPage("fashion");
        expect(await validateFirstScreen(loginPage)).equal(true);
        await loginPage.inputFirstAndLastNameField(testData.firstName, testData.lastName);
        await loginPage.inputEmailField(testData.email);
        await loginPage.inputPasswordField(testData.password);      
        await loginPage.clickSignUpBtn();

        expect(await validateSecondScreen(loginPage, 'fashion')).equal(true);
        await loginPage.inputCompanyName(testData.companyName, 'fashion');
        await loginPage.inputPhoneNumber(testData.phoneNumber, 'fashion');
        await loginPage.clickSignUpBtn();

        expect(await validateFirstScreenDashboard(dashboardPage)).equal(true);
        await dashboardPage.clickGetStartedWelcomeScreen();
        expect(await validateDashboardApps(dashboardPage, "Fashion")).equal(true);

        await sleep(5);
    });

    it.only('TestCase 1 - Santander', async function() {
        await loginPage.goToPage("santander");
        
        expect(await validateFirstScreen(loginPage)).equal(true);
        await loginPage.inputFirstAndLastNameField(testData.firstName, testData.lastName);
        await loginPage.inputEmailField(testData.email);
        await loginPage.inputPasswordField(testData.password);      
        await loginPage.clickSignUpBtn();

        expect(await validateSecondScreen(loginPage, 'santander')).equal(true);
        await loginPage.inputCompanyName(testData.companyName, 'santander');
        await loginPage.inputPhoneNumber(testData.phoneNumber, 'santander');
        await loginPage.inputVATNumber(testData.vatNumber);
        await loginPage.santanderPerformSelectDropdownIndustry('Industry', 'randomChoice');

        await loginPage.clickSignUpBtn();

        expect(await validateFirstScreenDashboard(dashboardPage)).equal(true);
        await dashboardPage.clickGetStartedWelcomeScreen();
        expect(await validateDashboardApps(dashboardPage, "Santander")).equal(true);

        await sleep(5);
    });













    async function validateDashboardApps(pageObject, value) {
        const pageVariables = await pageObject.elementPageVariablesWidgets(value);
        for (const variable of pageVariables) {
            expect(await pageObject.isElementLocated(variable), `"${variable}" is not found`).equal(true);
            expect(await pageObject.isElementVisible(variable), `"${variable}" is not found`).equal(true);
        }
        return true
    }

    async function validateFirstScreenDashboard(pageObject){
        const pageVariables = await pageObject.elementPageVariablesFirstScreen();
        for (const variable of pageVariables) {
            expect(await pageObject.isElementLocated(variable), `"${variable}" is not found `).equal(true);
        }
        expect(await pageObject.isElementVisible(pageObject.welcomeScreenGetStartedButton)).equal(true)
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

    async function validateSecondScreen(pageObject, page){
        const pageVariables = await pageObject.elementPageVariablesSecondScreen(page);
        for (const variable of pageVariables) {
            expect(await pageObject.isElementLocated(variable), `"${variable}" is not found `).equal(true);
        }
        expect(await pageObject.isElementVisible(pageObject.gettingStartedWithPayever)).equal(true);
        return true
    }

    function sleep(second) {
        return new Promise(resolve => setTimeout(resolve, second*1000));
    }

});
