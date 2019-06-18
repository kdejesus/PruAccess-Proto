$(document).ready(function () {
    let errAlertBanner = $("#alert_banner");
    let errMsg = $(".err_msg");
    let datepicker = $("#datepicker input[name='dob_input']");
    let alphaRegx = /[^A-Za-z0-9\s\[\]\@\-\_]*$/;
    let numRegx = /[^0-9]/g;

    // add condition to check WS response to show error message
    // errAlertBanner.css("display", "none");

    if ($("#datepicker") && $("#datepicker").length > 0) {
        $("#datepicker").datepicker({
            format: "dd MM yyyy"
        });

        $("#datepicker").on("changeDate", function () {
            datepicker.each(function (elem) {
                if (datepicker[elem].name && datepicker[elem].name === "dob_input")
                    showError(datepicker[elem], null);
            });
        });
    }

    if (errMsg && errMsg.length > 0) {
        // $("p[name='input_err']").css("display", "none");
        errMsg.css("display", "none");
    }

    // $("#dob_input").on(function (event) {
    //     alert();
    // });

    $("input").on("input", function (event) {
        if (this.className === "username_input") {
            showError(this, alphaRegx);
        }

        if (this.className === "otp_input") {
            showError(this, numRegx);
        }

        if (this.className.indexOf("dob") >= 0) {
            showError(this, null);
        }
    });

    $("#btn_read_more").click(function () {
        const dots = $("#dots");
        const moreText = $("#read_more");
        const btnText = $("#btn_read_more");

        if (dots.css("display") === "none") {
            dots.css("display", "inline");
            btnText.html("Read more");
            moreText.css("display", "none");
        } else {
            dots.css("display", "none");
            btnText.html("Read less");
            moreText.css("display", "inline");
        }
    });

    function showError(item, regx) {
        if (regx) {
            item.value = item.value.replace(regx, "");

            if (item.value.length < 6) {
                $("span[name='input_err']").css("display", "block");
                item.style.color = "red";
                item.style.borderBottom = "2px solid red";
            } else {
                $("span[name='input_err']").css("display", "none");
                item.style.color = "#808080";
                item.style.borderBottom = "2px solid #808080";
            }
        } else {
            if (item && (item.value.length >= 11 && item.value.length <= 12)) {
                errMsg[1].style.display = "none";
                item.style.color = "#808080";
                item.style.borderBottom = "2px solid #808080";
                $("#dp_icon")[0].style.color = "#808080";
                $("#dp_icon")[0].style.borderBottom = "2px solid #808080";
            } else {
                errMsg[1].style.display = "block";
                item.style.color = "red";
                item.style.borderBottom = "2px solid red";
                $("#dp_icon")[0].style.color = "red";
                $("#dp_icon")[0].style.borderBottom = "2px solid red";
            }
        }
    }
});