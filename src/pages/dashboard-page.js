const { By } = require('selenium-webdriver');
const { until } = require('selenium-webdriver');
const WAITING_ELEMENT_TIMEOUT = 30000 //milis

class DashboardPage {
    constructor(driver){
        this.driver = driver
        this.welcomeMessage = By.css('div[class=welcome-screen-content-title]');
        this.welcomeMessageDescription = By.css('div[class=welcome-screen-content-description]');
        this.welcomeScreenGetStartedButton = By.css('button[class=welcome-screen-content-button]');

        this.widgetTransactions = this.widgetLocator('Transactions');
        this.widgetCheckout = this.widgetLocator('Checkout');
        this.widgetConnect = this.widgetLocator('Connect');
        this.widgetProducts = this.widgetLocator('Products');
        this.widgetShops = this.widgetLocator('Shop');
        this.widgetMessage = this.widgetLocator('Messege'); //not exist
        this.widgetSettings = this.widgetLocator('Settings');

        this.widgetPointOfSaleFashion = this.widgetLocator('Point Of Sale');
        this.widgetPointOfSaleSantander = this.widgetLocator('Point of Sale');
    }

    async elementPageVariablesFirstScreen(){
        const pageVariables = [
            this.welcomeMessage,
            this.welcomeMessageDescription,
            this.welcomeScreenGetStartedButton
        ]
        return pageVariables
    }

    async widgetLocator(textValue){
        return By.xpath(`//div[contains(text(),'${textValue}')]`);
    }

    async elementPageVariablesWidgets(value){
        const pageVariables = [
            await this.widgetTransactions,
            await this.widgetConnect,
            await this.widgetCheckout,
            await this.widgetSettings
        ]

        if (value == 'Fashion') {
            pageVariables.push(await this.widgetProducts);
            pageVariables.push(await this.widgetShops);
            // pageVariables.push(await this.widgetMessage); //not exist element
        }

        if (value == 'Santander') {
            pageVariables.push(await this.widgetPointOfSaleSantander);
        }


        return pageVariables
    }

    async clickGetStartedWelcomeScreen() {
        await this.driver.findElement(this.welcomeScreenGetStartedButton).click()
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
}

module.exports = DashboardPage;