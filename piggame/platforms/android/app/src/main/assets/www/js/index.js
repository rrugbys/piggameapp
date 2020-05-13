/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {

        game();
        console.log('Received Event: ' + id);
    }
};

function game() {
    var btnRoll = document.querySelector(".btn-roll");
    var btnHold = document.querySelector(".btn-hold");
    var btnNew = document.querySelector(".btn-new");
    var dice = document.querySelector("#dice");
    var player0 = document.querySelector("#player-0");
    var player1 = document.querySelector("#player-1");
    var final = document.querySelector("#full-body .text");
    var fullBody = document.querySelector("#full-body");
    var activePlayer = 0;
    var roundScore = 0;
    var score = [0,0];


    btnNew.addEventListener("click", function() {
        btnRoll.classList.remove("hide");
        btnHold.classList.remove("hide");
        dice.classList.remove("hide");
        document.querySelector("#player-"+activePlayer).classList.add("active");
    });

    btnRoll.addEventListener("click", function () {
        var random = Math.ceil(Math.random()*6);
        disableGame(random);
    });


    btnHold.addEventListener("click", function () {
        score[activePlayer] += roundScore;
        if(score[activePlayer] >= 100) {
            document.querySelector("#score-"+activePlayer).textContent = score[activePlayer];
            fullBody.classList.remove("hide");
            final.textContent = "Player "+(activePlayer+1)+" won !";
        } else {
            document.querySelector("#score-"+activePlayer).textContent = score[activePlayer];
            dice.classList.add("hide");
            changePlayer();
        }
    });

    fullBody.addEventListener("click", function() {
        resetGame()
    });

    function changePlayer() {
        document.querySelector("#round-"+activePlayer).textContent = 0;
        activePlayer = activePlayer === 0 ? 1:0;
        player0.classList.toggle("active");
        player1.classList.toggle("active");
        roundScore = 0;
    }

    function resetGame() {
        score = [0,0];
        activePlayer = 0;
        roundScore = 0;
        btnRoll.classList.add("hide");
        btnHold.classList.add("hide");
        dice.classList.add("hide");
        fullBody.classList.add("hide");
        player0.classList.remove("active");
        player1.classList.remove("active");
        document.querySelector("#round-0").textContent = '0';
        document.querySelector("#round-1").textContent = '0';
        document.querySelector("#score-0").textContent = '0';
        document.querySelector("#score-1").textContent = '0';
    }

    function disableGame(random) {
        dice.classList.add("rotate-center");
        btnRoll.disabled = true;
        btnHold.disabled = true;
        dice.classList.remove("hide");
        var timeout = setTimeout(function() {
            dice.src = "dice-"+random+".png";
            if(random == 1) {
                changePlayer();
            } else  {
                var currentRound = document.querySelector("#round-"+activePlayer)
                roundScore += random;
                currentRound.textContent = roundScore
            }
            btnRoll.disabled = false;
            btnHold.disabled = false;
            dice.classList.remove("rotate-center");
        }, 300);
    }
}
app.initialize();
