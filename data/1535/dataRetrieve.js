/* THY-When document ready */
$(document).ready(function () {
    //a light bulb besides 4d & lotto name
    $("span#live").hide();

    //THY-modify here to output data location
    url = "index.html";
    grabLiveResult(url);

    var dt= new Date();
    var txtCurrentTime = dt.getHours() + "" + dt.getMinutes();
    var currentTime = parseInt(txtCurrentTime);
    if (currentTime>= 1900 && currentTime <= 2040) {
        $("span#live").show();

        var start = 10000 / 1000; var interval = 0;
        var timer = setInterval(function () {
            $(".Timer").text((start - ++interval) + " Refresh");
            if (interval === start) { start = 10000 / 1000; interval = 0; }
        }, 1000);

        var ajaxtimer =
            setInterval(function () {
                var oldrec = {}, newrec = {};
                $("a.popwin").each(function () {
                    oldrec[$(this).attr("id")] = $(this).text();
                });
                grabLiveResult(url);

                setTimeout(function () {

                    //$("#aM_3").html("1234");
                    $("a.popwin").each(function () {
                        newrec[$(this).attr("id")] = $(this).text();
                    });
                    $.each(newrec, function (i, value) {
                        if (newrec[i] !== oldrec[i]) {
                            $("#" + i).addClass("blink");
                            setTimeout(function () { $("#" + i).attr("class", "popwin"); }, 6000);
                        }
                    });
                }, 1000);

                if ($("#time").val() === 2000) { clearInterval(ajaxtimer); }
            }, 10000);
    }
    //reload button at magnum
    $(".btnReload").click(function () {
        window.location.reload();
    });
});

/* THY-Function to retrieve & place the data */
function grabLiveResult(url) {
    return $.ajax({
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        url: 'getLiveResult.php',
        data: {},
        dataType: 'json',
        success: function (data) {
            $.each(data, function (i, val) {
                if (val === null || i === "_5D" || i === "_6D") { return; }

                $("#" + i + "date").html(val.DrawDate);

                $("#a" + i + "_1").attr("href", url + val._1).html(val._1);
                $("#a" + i + "_2").attr("href", url + val._2).html(val._2);
                $("#a" + i + "_3").attr("href", url + val._3).html(val._3);
                for (var j = 0; j < val._P.length; j++) {
                    $("#a" + i + "_P" + j).attr("href", url + val._P[j]).html(val._P[j]);
                    if (val._P[j] === "....") { $("#a" + i + "_P" + j).removeAttr("href"); }
                }
                for (var k = 0; k < val.C.length; k++) {
                    $("#a" + i + "_C" + k).attr("href", url + val.C[k]).html(val.C[k]);
                }
            });
        }
    });
};

