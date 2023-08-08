const chrome = require('selenium-webdriver/chrome');
const webdriver = require('selenium-webdriver');

function buildDriver(){
    let options = new chrome.Options()
    options.addArguments([
        "--disable-blink-features=AutomationControlled", 
        "start-maximized", 
        // "disable-infobars", depricated from chromium 
        "disable-extensions",
        "disable-translate",
        "disable-popup-blocking",
        "disable-geolocation",
        "ignore-certificate-errors"
    ]);
    options.excludeSwitches([
        'enable-logging',
        'enable-automation'
    ]);
    let driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .setChromeOptions(options)
    .build();

    return driver;
}

class BasePage {
    constructor(){
        this.driver = buildDriver();
    }
    async goToUrl(url){
        await this.driver.get(url);
    }
    async closeBrowser(){
        await this.driver.quit();
    }

    async refreshSession(){
        this.driver = await buildDriver();
    }
};

module.exports = BasePage;