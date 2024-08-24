const fs = require("fs");
require("chromedriver");
const swd = require("selenium-webdriver");
const By = swd.By;
const until = swd.until;
const credentials = require("./config/credentials.json");
const answers = require("./config/answers.json");
const driver = new swd.Builder().forBrowser("chrome").build();

driver.manage().window().maximize();

let internships = [];

async function solveCaptcha() {
    console.log("Please solve the CAPTCHA manually and press Enter to continue...");
    return new Promise(resolve => process.stdin.once('data', resolve));
}

async function main() {
    try {
        await driver.get("https://internshala.com");

        // Dismiss any subscription alert pop-up
        try {
            await driver.wait(until.elementLocated(By.className("subscription_alert")), 5000);
            await (await driver.findElement(By.id("no_thanks"))).click();
        } catch (err) {
            console.log("No subscription alert found or failed to dismiss it.");
        }

        // Extract internship details
        let companies = await driver.findElements(By.css('.company > h4 > a'));
        for (let i = 0; i < companies.length; i += 2) {
            let link = await companies[i].getAttribute("href");
            let profile = await companies[i].getText();
            let companyName = await companies[i + 1].getText();
            internships.push({
                "profile": profile,
                "link": link,
                "company": companyName,
                "applied": "false"
            });
        }

        // Navigate back to the homepage
        await driver.get("https://internshala.com");

        // Find and click the login button
        let loginModal = await driver.findElement(By.className("login-cta"));
        loginModal.click();

        // Enter email and password, then submit
        let email = await driver.findElement(By.name("email"));
        email.sendKeys(credentials.email);
        let pwd = await driver.findElement(By.name("password"));
        pwd.sendKeys(credentials.password);
        let loginButton = await driver.findElement(By.id("modal_login_submit"));
        loginButton.click();

        // Wait for CAPTCHA to appear and solve it manually
        await solveCaptcha();

        // Wait for the dashboard to load
        // await driver.wait(until.elementLocated(By.className("header_chat_notification link")), 15000);

        // Loop through internships and apply for Web Development roles
        for (let i = 0; i < internships.length; i++) {
            if (internships[i].profile === "Web Development") {
                await driver.get(internships[i].link);

                // Click apply button
                await (await driver.findElement(By.className("btn btn-primary internship_detail_btn"))).click();
                
                // If additional educational info is required
                await (await driver.findElement(By.className("btn btn-primary education_incomplete"))).click();

                // Fill out the application form
                await driver.wait(until.elementLocated(By.id("cover_letter")), 15000);
                let assessmentQuestion1 = await driver.findElement(By.id('cover_letter'));
                assessmentQuestion1.sendKeys(answers["1"]);

                let assessmentQuestion2 = await driver.findElement(By.css('textarea[placeholder="e.g. I am available full time in Pune for the next 6 months, but will have exams for 15 days in June."]'));
                assessmentQuestion2.sendKeys(answers["2"]);

                // Submit the application
                await (await driver.findElement(By.css('input[type="submit"]'))).click();
                console.log("Applied for Web Development at", internships[i].company);
            }
        }
    } catch (err) {
        console.log("An error occurred:", err);
    } finally {
        await driver.quit();
    }
}

main();
