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