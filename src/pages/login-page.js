const { By } = require('selenium-webdriver');
const { until } = require('selenium-webdriver');
let BasePage = require('../pages/base-page.js');
const WAITING_ELEMENT_TIMEOUT = 15000 //milis

class LoginPage extends BasePage {
    constructor(){
        super();

        this.loginTitle = By.css('div[class="registration-header-title"]');
        this.firstNameField = By.css('input[formcontrolname="firstName"]');
        this.firstNameInputField = By.css('input[formcontrolname="firstName"]');
        this.lastNameField = By.css('input[formcontrolname="lastName"]');
        this.emailField = By.css('input[formcontrolname="email"]');
        this.passwordField = By.css('input[formcontrolname="password"]');
        this.confirmPasswordField = By.css('input[formcontrolname="confirmPass"]');
        this.signUpForFreeBtn = By.css('button[type="submit"][class="signup-button"]');
        this.loginBtn = By.css('button[type="button"][class^="signup-button"]');

        this.companyNameField = By.css('input[formcontrolname="name"]');
        this.phoneNumberField = By.css('input[formcontrolname="phoneNumber"]');
        this.gettingStartedWithPayever = By.xpath("//div[contains(text(), ' Get started with payever')]")

    };

    async goToPage(value){
        await this.goToUrl(`https://commerceos.staging.devpayever.com/registration/${value}`);
    }

    async elementPageVariablesFirstScreen(){
        const pageVariables = [
            this.firstNameField,
            this.lastNameField,
            this.emailField,
            this.passwordField,
            this.confirmPasswordField,
            this.signUpForFreeBtn,
            this.loginBtn
        ]
        return pageVariables
    }

    async elementPageVariablesSecondScreen(){
        const pageVariables = [
            this.companyNameField,
            this.phoneNumberField
        ]
        return pageVariables
    }

    async performSendKeys(selector, value) {
        const input = await this.driver.findElement(selector)
        const parent = await input.findElement(By.xpath('..'));
      
        await this.driver.executeScript('arguments[0].style.height = "auto"', parent);
        await this.driver.executeScript('arguments[0].style.overflow = "auto"', parent);
    
        await input.sendKeys(value);
    }

    async inputFirstAndLastNameField(firstName, lastName) {
        await this.performSendKeys(this.firstNameField, firstName);
        await this.performSendKeys(this.lastNameField, lastName);
    }

    async inputEmailField(email) {
        await this.performSendKeys(this.emailField, email);
    }

    async inputPasswordField(password) {
        await this.performSendKeys(this.passwordField, password);
        await this.performSendKeys(this.confirmPasswordField, password);
    }

    async clickSignUpBtn(){
        await this.driver.findElement(this.signUpForFreeBtn).click()
    }

    async inputCompanyName(company){
        await this.performSendKeys(this.companyNameField, company);
    }

    async inputPhoneNumber(phoneNumber){
        await this.performSendKeys(this.phoneNumberField, phoneNumber);
    }

    async isElementLocated(locator){
        try {
            await this.driver.wait(until.elementLocated(locator), WAITING_ELEMENT_TIMEOUT);
            return true
        } catch(err){
            console.log(err)
            return err
        }
    }

    async isElementVisible(locator){
        try {
            await this.driver.wait(until.elementIsVisible(this.driver.findElement(locator)), WAITING_ELEMENT_TIMEOUT);
            return true
        } catch(err) {
            console.log(err)
            return err
        }
    }

    async getTxtInputted(locator){
        return this.driver.findElement(locator).getText();
    }
};

module.exports = new LoginPage();