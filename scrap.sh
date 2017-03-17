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