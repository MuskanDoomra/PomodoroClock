let session_t = 1 , break_t = 1 , session_count = 1;

let total_session_time , total_break_time , session_min = 0 , session_sec = 0 , break_min = 0 , break_sec = 0;

var s;

var time = document.getElementById("time");

var session_no = document.getElementById("display_session");

var session_time = document.getElementById("session_time");
var session_dec = document.getElementById("session_dec");
var session_inc = document.getElementById("session_inc");

var break_time = document.getElementById("break_time");
var break_dec = document.getElementById("break_dec");
var break_inc = document.getElementById("break_inc");

var start = document.getElementById("start");

var reset = document.getElementById("reset");

session_dec.addEventListener("click",function() {
    if(session_t > 0) {
        session_t--;
        session_time.innerHTML = session_t + " min";
    }
});

session_inc.addEventListener("click",function() {
        session_t++;
        session_time.innerHTML = session_t + " min";
});

break_dec.addEventListener("click",function() {
    if(break_t > 0) {
        break_t--;
        break_time.innerHTML = break_t + " min";
    }
});

break_inc.addEventListener("click",function() {
        break_t++;
        break_time.innerHTML = break_t + " min";
});


start.addEventListener("click",function() {

    session_inc.disabled = true;
    session_dec.disabled = true;
    break_inc.disabled = true;
    break_dec.disabled = true;

    start.innerHTML = ( start.innerHTML === "Start" || start.innerHTML === "Resume" ) ? "Pause" : "Resume";

    if(start.innerHTML === "Pause") {

        if(session_min === 0 && session_sec === 0)
            total_session_time = session_t * 60;

        s = setInterval(function(){

            session_min = parseInt(total_session_time / 60 , 10);
            session_sec = parseInt(total_session_time % 60 , 10);

            session_min = session_min < 10 ? "0" + session_min : session_min;
            session_sec = session_sec < 10 ? "0" + session_sec : session_sec;

            time.innerHTML = session_min + ":" + session_sec;

            total_session_time--;

            if(total_session_time < 0) {
                total_session_time = session_no.innerHTML === "Break Time !" ? session_t * 60 : break_t * 60;
                session_count = session_no.innerHTML === "Break Time !" ? session_count + 1 : session_count;
                session_no.innerHTML = session_no.innerHTML === "Break Time !" ? "Session " + session_count : "Break Time !";
                time.style.color = session_no.innerHTML === "Break Time !" ? "#ff6600" : "rgb(127, 197, 255)";
            }

        }, 1000);
                    
    }

    else
        clearInterval(s);

});

reset.addEventListener("click",function() {
    clearInterval(s);
    start.innerHTML = "Start";
    total_break_time = 0;
    total_session_time = 0;
    session_sec = 0;
    session_min = 0;
    session_count = 1;
    session_t = 1;
    break_t = 1;
    time.innerHTML = "00:00";
    time.style.color = "rgb(127, 197, 255)";
    session_no.innerHTML = "Session " + session_count;
    session_time.innerHTML = session_t + " min";
    break_time.innerHTML = break_t + " min";
    session_inc.disabled = false;
    session_dec.disabled = false;
    break_inc.disabled = false;
    break_dec.disabled = false;
});
