import { describe } from "mocha";
import { Browser, Builder, By, Key, until } from "selenium-webdriver";
import { expect } from "chai";

describe("Sharelane registration tests", () => {
  it("Positive registration in Sharelane", async function () {
    this.timeout(10000);
    let driver = await new Builder().forBrowser(Browser.EDGE).build();
    await driver.manage().window().maximize();
    try {
      await driver.get("https://www.sharelane.com/cgi-bin/register.py");
      const continueButton = await driver.findElement(
        By.css('input[value="Continue"]')
      );
      const zipCode = await driver.findElement(By.name("zip_code"));
      await zipCode.sendKeys("94118");
      await continueButton.click();

      const registerButton = await driver.findElement(
        By.css('input[value="Register"]')
      );
      await driver.findElement(By.name("first_name")).sendKeys("James");
      await driver.findElement(By.name("last_name")).sendKeys("Watson");
      await driver
        .findElement(By.name("email"))
        .sendKeys("james_watson@833.02.sharelane.com");
      await driver.findElement(By.name("password1")).sendKeys("1111");
      await driver.findElement(By.name("password2")).sendKeys("1111");
      await registerButton.click();

      const registrationMessage = await driver.wait(
        until.elementLocated(By.className("confirmation_message")),
        5000
      );
      expect(await registrationMessage.getText()).to.equal(
        "Account is created!"
      );
    } finally {
      await driver.quit();
    }
  });
});

it("Negative registration in Sharelane", async function () {
  this.timeout(10000);
  let driver = await new Builder().forBrowser(Browser.EDGE).build();
  await driver.manage().window().maximize();
  try {
    await driver.get("https://www.sharelane.com/cgi-bin/register.py");
    const continueButton = await driver.findElement(
      By.css('input[value="Continue"]')
    );
    const zipCode = await driver.findElement(By.name("zip_code"));
    await zipCode.sendKeys("94118");
    await continueButton.click();

    const registerButton = await driver.findElement(
      By.css('input[value="Register"]')
    );
    await driver.findElement(By.name("first_name")).sendKeys("55555");
    await driver.findElement(By.name("last_name")).sendKeys("55555");
    await driver.findElement(By.name("email")).sendKeys("55555@mail.ru");
    await driver.findElement(By.name("password1")).sendKeys("55555");
    await driver.findElement(By.name("password2")).sendKeys("55555");
    await registerButton.click();

    const errorMessage = await driver.findElement(By.css(".error_message"));
    expect(await errorMessage.getText()).to.equal(
      "Oops, error on page. Some of your fields have invalid data or email was previously used"
    );
  } finally {
    await driver.quit();
  }
});

it("Positive login in Sharelane", async function () {
  this.timeout(10000);
  let driver = await new Builder().forBrowser(Browser.EDGE).build();
  await driver.manage().window().maximize();
  try {
    await driver.get("https://sharelane.com/cgi-bin/main.py");
    await driver
      .findElement(By.name("email"))
      .sendKeys("james_watson@833.02.sharelane.com");
    await driver.findElement(By.name("email")).click();
    await driver.findElement(By.name("password")).sendKeys("1111");
    await driver.findElement(By.name("password")).click();
    await driver.findElement(By.css('input[value="Login"]')).click();
  } finally {
    await driver.quit();
  }
});
