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
        "ignore-certificate-errors",
        "--password-store=basic", //Chrome will not asking to save password
    ]);
    //Chrome will not asking to save password
    options.setUserPreferences({
        'credentials_enable_service': false,
        'profile.password_manager_enabled': false
    });
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

    async closeBrowser(){
        await this.driver.quit();
    }

    async refreshSession(){
        this.driver = await buildDriver();
    }
};

module.exports = BasePage;