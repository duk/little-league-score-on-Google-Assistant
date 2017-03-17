#!/bin/bash
/usr/local/bin/phantomjs /home/d3lee/phantomtest/scrapfirebase.js | curl -X POST -d @- 'https://YOUR.firebaseio.com/scores.json?auth=YOURKEY';
#
