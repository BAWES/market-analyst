const puppeteer = require("puppeteer");
const chalk = require("chalk");
var fs = require("fs");

// MY OCD of colorful console.logs for debugging... IT HELPS
const error = chalk.bold.red;
const success = chalk.keyword("green");

(async () => {
  try {
    // open the headless browser
    var browser = await puppeteer.launch({ headless: true });

    // open a new page
    var page = await browser.newPage();

    // enter url in page
    await page.goto(`https://finance.yahoo.com/quote/DIS`);

    await page.waitForSelector("li.js-stream-content");

    var news = await page.evaluate(() => {
        var articleList = document.querySelectorAll(`li.js-stream-content h3`);


        var titleLinkArray = [];
        for (var i = 0; i < articleList.length; i++) {
          titleLinkArray[i] = {
            title: articleList[i].innerText.trim(),
            // link: articleList[i].getAttribute("href"),
            // age: ageList[i].innerText.trim(),
            // score: scoreList[i].innerText.trim()
          };
        }
        return titleLinkArray;


        // var ageList = document.querySelectorAll(`span.age`);
        // var scoreList = document.querySelectorAll(`span.score`);

        // var titleLinkArray = [];
        // for (var i = 0; i < articleList.length; i++) {
        //   titleLinkArray[i] = {
        //     title: articleList[i].innerText.trim(),
        //     link: articleList[i].getAttribute("href"),
        //     age: ageList[i].innerText.trim(),
        //     score: scoreList[i].innerText.trim()
        //   };
        // }
        // return titleLinkArray;
        
      });
      console.log(news);

      // Close Browser
      await browser.close();

      // Writing the news inside a json file
    //   fs.writeFile("hackernews.json", JSON.stringify(news), function(err) {
    //     if (err) throw err;
    //     console.log("Saved!");
    //   });

      // Log that success
      console.log(success("Browser Closed + Successful crawl"));
  } catch (err) {
    // Catch and display errors
    console.log(error(err));
    await browser.close();
    console.log(error("Browser Closed"));
  }
})();