require("chromedriver");

const fs = require("fs");
let wd = require("selenium-webdriver");
let browser = new wd.Builder().forBrowser('chrome').build();
let finalData = [];

async function getProjectUrls(url,i){
    await browser.get(url);
    await browser.wait(wd.until.elementLocated(wd.By.css("a.text-bold")));

    let projectBoxes = await browser.findElements(wd.By.css("a.text-bold"));
    finalData[i]["projects"]=[]; 
for(let j in projectBoxes) {
    if(j==8){
        break; 
    }
    finalData[i].projects.push({projectUrls: await projectBoxes[j].getAttribute("href")});
}
 
}
async function getIssues(url,i,j){

    await browser.get(url);
}
async function main() {
    await browser.get(`https://github.com/topics`);
     await browser.wait(wd.until.elementLocated(wd.By.css(".no-underline.d-flex.flex-column.flex-justify-center")));
    let tables = await browser.findElements(wd.By.css(".no-underline.d-flex.flex-column.flex-justify-center"));
    let topicUrls=[];
    for( let table of tables) 
    {
        finalData.push({topicUrls : await table.getAttribute("href")});
        
    }
   for(let i in finalData){
       await getProjectUrls(finalData[i].topicUrls,i);
   }
  for(let i in finalData){
      let projects = finalData[i].projects;
      for(let j in projects){
          await getIssues(projects[j].projectUrls, i , j);
      }
  }
fs.writeFileSync("finalData.json", JSON.stringify(finalData));
}
main();