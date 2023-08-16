const { By } = require('selenium-webdriver');
const { until } = require('selenium-webdriver');
let testData = require('../data/test-data.js');
const WAITING_ELEMENT_TIMEOUT = 15000 //milis

class LoginPage {
    constructor(driver){
        this.driver = driver;
        //Fashion
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
        this.gettingStartedWithPayever = By.xpath("//div[contains(text(), ' Get started with payever')]");

        //Santander
        this.santanderCompanyNameLabel = this.santanderFormRegistrationLabel('Company name');
        this.santanderPhoneNumberLabel = this.santanderFormRegistrationLabel('Phone Number');
        this.santanderVATNumberLabel = this.santanderFormRegistrationLabel('VAT number');
        this.santanderIndustryLabel = this.santanderFormRegistrationLabel('Industry');
        this.santanderIndustryDropdownValueList = By.xpath("//div[@role='listbox']//mat-option");
    };

    async goToPage(value){
        await this.driver.get(`https://commerceos.staging.devpayever.com/registration/${value}`);
    }

    async santanderFormRegistrationLabel(textValue){
        return By.xpath(`//*[contains(text(), '${textValue}')]/..//input`);
    }

    async santanderFormRegistrationChevronDropdown(textValue) {
        return By.xpath(`//*[contains(text(), '${textValue}')]/../../*[contains(@class, 'dropdown-arrow')]`);
        
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

    async elementPageVariablesSecondScreen(page){
        let pageVariables = []
        if (page == 'fashion' ){
            pageVariables = [
                this.companyNameField,
                this.phoneNumberField
            ]
        }
        
        if (page == 'santander' ){
            pageVariables = [
                await this.santanderCompanyNameLabel,
                await this.santanderPhoneNumberLabel,
                await this.santanderVATNumberLabel
            ]
        }
        
        return pageVariables
    }

    async modifyLabelDOM(selector) {
        const input = await this.driver.findElement(selector)
        const parent = await input.findElement(By.xpath('..'));
      
        await this.driver.executeScript('arguments[0].style.height = "auto"', parent);
        await this.driver.executeScript('arguments[0].style.overflow = "auto"', parent);

        return input
    }

    async performSendKeys(selector, value) {
        const input = await this.modifyLabelDOM(selector)
        await input.sendKeys(value);
    }

    async santanderSelectDropdownValueIndustry(value){
        const elements = await this.driver.findElements(this.santanderIndustryDropdownValueList);

        if (value != 'randomChoice') {
            for(let e of elements) {
                if (await e.getText() == value) {
                    e.click();
                    break;
                }
            }
        } else {
            const randomChoice = await testData.getRandomInt(elements.length)
            elements[randomChoice].click()
        }
        
    }

    async santanderPerformSelectDropdownIndustry(fieldName, value){
        const targetDropdown = await this.santanderFormRegistrationChevronDropdown(fieldName);
        await this.modifyLabelDOM(targetDropdown);
        await this.driver.findElement(targetDropdown).click()
        await this.santanderSelectDropdownValueIndustry(value);
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

    async inputCompanyName(company, page){
        let selector = {}
        if (page == 'fashion') {
            selector = this.companyNameField
        }

        if (page == 'santander') {
            selector = await this.santanderCompanyNameLabel
        }

        await this.performSendKeys(selector, company);
    }

    async inputPhoneNumber(phoneNumber, page){
        let selector = {}
        if (page == 'fashion') {
            selector = this.phoneNumberField
        }

        if (page == 'santander') {
            selector = await this.santanderPhoneNumberLabel
        }
        await this.performSendKeys(selector, phoneNumber);
    }

    async inputVATNumber(vatNumber){
        await this.performSendKeys(await this.santanderVATNumberLabel, vatNumber);
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

module.exports = LoginPage;