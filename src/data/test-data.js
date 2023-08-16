const randomEmail = require('random-email');
var crypto = require("crypto");

class TestData {
    constructor(){
        this.firstName = "test",
        this.lastName = "test2",
        this.email = this.emailGenerator(),
        this.password = "Qwertyuiop1!",
        this.companyName = "King Enterprise",
        this.phoneNumber = "123456789"
        this.vatNumber = this.getRandomInt(10000000000)
    }

    async getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

    async emailGenerator(){
        const numerator = await this.getRandomInt(100000);
        return randomEmail({domain: `${
            await this.getRandomInt(100000)
        }e${
            crypto.randomBytes(10).toString('hex')
        }J${
            await this.getRandomInt(100000)
        }.jodie`});
    }

    async refreshEmail(){
        this.email = this.emailGenerator()
    }
}

module.exports = TestData;