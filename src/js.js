let answer, question = "";
const userScore = window.localStorage;

if (userScore.getItem("score") === null || userScore.getItem("correct") === null || userScore.getItem("incorrect") === null) {
    userScore.setItem('score', 0);
    userScore.setItem('correct', 0);
    userScore.setItem('incorrect', 0);
}

const randsLoading = [
    "<span>👀</span> ระวังปะแล้ด!",
    "<span>😖</span> โค๊ะหยังมาสาบ!",
    "<span>😏</span> แอ่นแล่ะ แอ่นแล่ะ!",
    "<span>😲</span> โป๊ดโท ทำโม สังโค",
    "<span>😁</span> อ้ายมากี่คนครับ?",
    "<span>😁</span> อ้ายมากี่คนครับ?",
];
function getRandWord() {
    $.get("/wordList.php?params=random",
        function (data, textStatus, jqXHR) {
            $("#guessWord").text(data.Lanna_word);
            question = data.Lanna_word;
            answer = data.Thai_word;
        },
        "json"
    );
}

function checkUserScore() {
    Swal.fire({
        title: "คะแนนของฉัน",
        html:
            `<div class="d-flex justify-content-between">` +
            `<p class="m-0">ตอบถูก</p>` +
            `<p class="m-0">${userScore.getItem("correct")}</p>` +
            `</div>` +
            `<div class="d-flex justify-content-between">` +
            `<p class="m-0">ตอบผิด</p>` +
            `<p class="m-0">${userScore.getItem("incorrect")}</p>` +
            `</div>` +
            `<div class="d-flex justify-content-between">` +
            `<h5 class="m-0">คะแนนรวม</h5>` +
            `<p class="m-0">${userScore.getItem("score")}</p>` +
            `</div>`
    })
}

$(document).ready(function () {
    getRandWord();

});

$("#answerForm").submit(function (e) {
    e.preventDefault();
    const submittedAnswer = $("#answerInput").val();
    /* Check Answer */
    if (submittedAnswer == answer) {
        Swal.fire({
            icon: "success",
            html: "<p class='m-0'>อี้ก่า! ถูกต้องงนะคร้าบ ไปลักผ่อเฉลยมากา</p><small>( ถูกต้องนะคร้าบ! ไปแอบดูเฉลยมาหรือเปล่าเนี้ย )</small>"
        }).then(function () {
            $("#guessWord").html(randsLoading[Math.floor(Math.random() * randsLoading.length)]);
            userScore.setItem('score', parseInt(userScore.getItem("score")) + 1);
            userScore.setItem('correct', parseInt(userScore.getItem("correct")) + 1);
            getRandWord();
            $("#answerInput").val("");
        });
    } else {
        Swal.fire({
            icon: "error",
            html: "<p class='m-0'>ดูเหมือนจะยังบ่าใจ้เตื่อ... ลองผ่อแหมกำ!</p><small>( ดูเหมือนจะยังไม่ใช่นะ... ลองดูอีกครั้งสิ! )</small>",
            showDenyButton: true,
            confirmButtonText: 'ไปคำอื่น',
            denyButtonText: `ดูเฉลย`,
        }).then(function (res) {
            if (res.isDenied) {
                Swal.fire({
                    icon: 'info',
                    html: `<b>${question}</b> มีความหมายว่า <b>${answer}</b>`
                }).then(function () {
                    $("#guessWord").html(randsLoading[Math.floor(Math.random() * randsLoading.length)]);
                    getRandWord();
                });
            } else {
                $("#guessWord").html(randsLoading[Math.floor(Math.random() * randsLoading.length)]);
                getRandWord();

            }
            userScore.setItem('incorrect', parseInt(userScore.getItem("incorrect")) + 1);
            $("#answerInput").val("");
        });
    }
});