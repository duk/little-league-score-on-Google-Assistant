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

