import {When} from "cucumber";
import {browser} from 'protractor/built';
import {by, element, ExpectedConditions} from "protractor";
import Payment = require('../pageElements/paymentPageElements');

let payment: Payment = new Payment();

When(/^In the payment page, I expect to have the following payment methods available$/, async (data) => {
    let rows = data.hashes();
    await browser.driver.wait(ExpectedConditions.urlContains(browser.baseUrl + 'payment'), 30000);
    await browser.driver.wait(ExpectedConditions.visibilityOf(payment.paymentMethodContainer), 30000);

    for (let i = 0; i < rows.length; i++) {
        let paymentOption = rows[i].PaymentMethod.toString();
        await browser.driver.wait(element(by.xpath("//input[@value='" + paymentOption + "']")).isPresent(), 30000);
    }
});
