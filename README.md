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

## 2. Emailing the result to yourself

Then I used mailgun API to send the resulted png image to myself

## 3. Creating a bash shell script

After validating that it worked, I created a simple bash shell script.

## 4. Schedule a job using cron

Then I added a cron job to send me an email every night at 2:30 am.

## 5. I was happy, but not super happy.

I didn't even want to check email. I just wanted to talk to my Google Home to get the result whenever I want.

## 6. Behold API.io 


