const { By } = require('selenium-webdriver');
const { until } = require('selenium-webdriver');
let BasePage = require('../pages/base-page.js');
const WAITING_ELEMENT_TIMEOUT = 15000 //milis

class DashboardPage extends BasePage {
    constructor(){
        super()
        this.welcomeMessage = By.css('div[class=welcome-screen-content-title]');
        this.welcomeMessageDescription = By.css('div[class=welcome-screen-content-description]');
        this.welcomeScreenGetStartedButton = By.css('div[class=welcome-screen-content-button]');
    }

    async elementPageVariablesFirstScreen(){
        const pageVariables = [
            this.welcomeMessage,
            this.welcomeMessageDescription,
            this.welcomeScreenGetStartedButton
        ]
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

module.exports = new DashboardPage();