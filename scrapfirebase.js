var page = require('webpage').create();

page.open('https://leagues.bluesombrero.com/Default.aspx?tabid=1170364&isLogin=True', function (status) {
    if (status === "success") {

        page.evaluate(function () {
            document.getElementById('dnn_ctr1253048_Register_ctl00_UserNameTextBox').value = 'username';
            document.getElementById('dnn_ctr1253048_Register_ctl00_Password').value = 'password';
            document.getElementById('dnn_ctr1253048_Register_ctl00_SingInButton').click();
        });

        // submit login then you wait for 10 sec.
        setTimeout(function () {
            page.open('https://leagues.bluesombrero.com/Default.aspx?tabid=1171106', function (status) {
                if (status !== "success") {
                    phantom.exit(1);
                    return;
                }

                page.evaluate(function () {
                    document.getElementById("dnn_ctr1253747_ViewScores_dropDownDivisions_Arrow").click();
                    var items = document.getElementsByClassName('rcbItem');

                    for (var i = 0; i < items.length; i++) {

                        // get AAA team scores
                        if (items[i].innerHTML === 'AAA') {
                            items[i].click();
                        }
                    }
                });

                // open new url then wait for another 10 sec.
                setTimeout(function () {

                    var results = page.evaluate(function () {
                        var rows = document.querySelectorAll('table#dnn_ctr1253747_ViewScores_radgridAwayTeamDisplayFirst_ctl00 tbody tr');
                        var myArray = [];
                        for (var i = 0; i < rows.length; i++) {
                            //iterate through rows
                            //rows would be accessed using the "row" variable assigned in the for loop
                            var result = {};
                            result.date = new Date(rows[i].cells[1].innerText); // date
                            result.location = rows[i].cells[3].innerText; // location
                            result.awayTeam = rows[i].cells[4].innerText; // awayTeam
                            result.homeTeam = rows[i].cells[5].innerText; // homeTeam
                            result.score = rows[i].cells[6].innerText.replace(/\s/g, ''); // score

                            myArray.push(result);

                        }

                        return JSON.stringify(myArray);
                    });

                    console.log(results);
                    phantom.exit();

                }, 10000);


            });
        }, 10000);
    }
});

