const randomEmail = require('random-email');

class TestData {
    constructor(){
        this.firstName = "test",
        this.lastName = "test2",
        this.email = this.emailGenerator(),
        this.password = "Qwertyuiop1!",
        this.companyName = "King Enterprise",
        this.phoneNumber = "123456789"
    }

    async getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

    async emailGenerator(){
        const numerator = await this.getRandomInt(1000);
        return randomEmail({domain: `exampleJ${numerator}.com`});
    }

    async refreshEmail(){
        this.email = this.emailGenerator()
    }
}

module.exports = new TestData();