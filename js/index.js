// Concept/design by: Fairpixels
// URL: www.fairpixels.co
// Via: www.thenextweb.com/syndication/2018/01/17/hawaiis-emergency-alert-systems-interface-looked/

$(document).ready(function () {
    getLocation(); // get's lat/lon
    
    $('.client').fadeOut('fast')
    $('.patient').fadeIn('fast')

    // TOGGLE BETWEEN DISTRESS/EMERGENCY RESPONSE PAGES
    $(".everything").click(function () {
        $(".toggle").fadeOut('fast', function () {
            $(".toggle").text(($(".toggle").text() == 'Nearby Emergencies') ? 'Send Distress Signal' : 'Nearby Emergencies').fadeIn('fast');
        })

        $('.patient').fadeToggle('fast', function () {
            $('.client').fadeToggle('fast');
        })
    })
});

// PAGE: INITIAL SENDING OF ALERT
$('.alarm>div').on('click', function () {
    $('.two').toggleClass('active'); // make 2 red

    // fade out 1 section and fade in type section
    $('.alarm').fadeOut('fast', function () {
        $('.confirm').fadeIn('fast');
    });
});

// PAGE: CONFIRMATION
$('.yes').on('click', function () {
    // what does this do
    $('.three').toggleClass('active'); // go to section 3
    $('.confirm').fadeOut('fast', function () {
        $('.type').fadeIn('fast');
    });
});

$('.no').on('click', function () {
    $('.two, .three').removeClass('active');
    $('.confirm').fadeOut('fast', function () {
        $('.alarm').fadeIn('fast');
    });
});

// PAGE: UPDATE INFORMATION
$('.select').on('click', function () {    
    $('.confirm').fadeOut('fast', function () {
        $('.type').fadeIn('fast');
    });

});

// ----------- GETTING LOCATION -----------
var x = document.getElementById("location");

var lat, lon;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    x.innerHTML = "(" + lat + ", " + lon + ")";
}

// NOTIFICIATINOS
function notifyMe() {
    var message = "Emergency Alert at " + lat + ", " + lon + ".";

    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification(message);
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                var notification = new Notification(message);
            }
        });
    }
}
