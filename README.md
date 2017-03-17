# How to get local Team Scores on Google Assistant
A Tutorial on how to make your Google Home tell you your town local sport team scores

## Tools 

* [Firebase](https://firebase.google.com) account
* [API.io](https://api.io) account
* [PhantomJS](http://phantomjs.org/)
* [Mailgun account](https://mailgun.com)
* Google Home
* Ubuntu server to process cron job

## Goals

This tutorial shows how you can scrap a web page, stick info on the page to firebase database then using firebase functions as webhooks inside API.io. The end of this tutorial you should be able to set up your Google Home so that it can tell you your little league team's scores. It's a silly thing to do, but I believe in loading off tidious works to a computer.

## 1. Scraping a web page

First, I started going dodwn the path of using Scrapy, but current web development state makes it really difficult to use it. There are just too much javascript stuff in any page you visit. So I gave up on that idea and decided to use PhantomJS to scrap a web page.

```javascript
var page = require('webpage').create();
page.viewportSize = { width: 1024, height: 768 };

page.open('https://leagues.bluesombrero.com/Default.aspx?tabid=1170364&isLogin=True', function (status) {
    console.log("Status: " + status);
    if (status === "success") {

        page.evaluate(function () {
            document.getElementById('dnn_ctr1253048_Register_ctl00_UserNameTextBox').value = 'username';
            document.getElementById('dnn_ctr1253048_Register_ctl00_Password').value = 'password';
            document.getElementById('dnn_ctr1253048_Register_ctl00_SingInButton').click();
        });

        // submit login then you wait for 10 sec.
        setTimeout(function () {
            page.open('https://leagues.bluesombrero.com/Default.aspx?tabid=1171103&subctl=teamcalendar&teamid=124033#/schedule', function (status) {
                if (status !== "success") {
                    phantom.exit(1);
                    return;
                }

                page.evaluate(function () {

                });

                // open new url then wait for another 10 sec.
                setTimeout(function () {

                    page.render('final.png');
                    console.log('final url is ' + page.url);
                    console.log('finished!');
                    phantom.exit();

                }, 10000);


            });
        }, 10000);
    }
});
```

## 2. Emailing the result to yourself

Then I used mailgun API to send the resulted png image to myself

```bash
curl -s --user 'api:key-yourkeygoesinhere' \
    https://api.mailgun.net/v3/yourdomain/messages \
    -F from='test@test.com' \
    -F to='reciepient1@test.com' \
    -F cc='reciepient2@test.com' \
    -F subject='Score' \
    -F text='Daily update on Your Team' \
    -F attachment=@final.png;
```

## 3. Creating a bash shell script

After validating that it worked, I created a simple bash shell script.

```bash
#!/bin/bash
/usr/local/bin/phantomjs /home/d3lee/phantomtest/test.js;
#
curl -s --user 'api:key-yourkeygoesinhere' \
    https://api.mailgun.net/v3/yourdomain/messages \
    -F from='test@test.com' \
    -F to='reciepient1@test.com' \
    -F cc='reciepient2@test.com' \
    -F subject='Score' \
    -F text='Daily update on Your Team' \
    -F attachment=@final.png;
# remove png file
rm /home/d3lee/final.png;
```

## 4. Schedule a job using cron

Then I added a cron job to send me an email every night at 2:30 am.

`crontab -e`

Then add
`30 2 * * * sh scrap.sh`

## 5. I was happy, but not super happy.

I didn't even want to check email. I just wanted to talk to my Google Home to get the result whenever I want.

## 6. Behold API.io 


