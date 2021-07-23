<template>

  <div id="container">
    <div id="canvasContainer">
      <h1>Far West Sniper</h1>
      
      <div v-if="start" class="score">score: {{ score }}</div>
      <div v-if="start" class="timer">{{ timer }}</div>
      <div v-if="gameOver" class="finalScore">
        <div class="finalScores">
          <div class="title">Final Score</div>
          <div>{{ score }}</div>
        </div>
        <div class="finalScores">
          <div>High Scores</div>
          <ol>
            <li v-for="points in scores.slice(0, 10)" :key="points.id">
              {{ points }}
            </li>
          </ol>
        </div>
      </div>
      <img class="cloud1" src="../public/images/cloud.png" alt="cloud" width="200" height="100">
      <img class="cloud2" src="../public/images/cloud.png" alt="cloud" width="200" height="100">
      <canvas 
        id="myCanvas" 
        width="500" 
        height="500"
        @click="addTime"
        v-on:click="scorePoints"
        />
      <button v-if="!start" @click="startGame">New Game</button>
      <button v-if="gameOver" @click="startGame">Restart</button>
    </div>    
  </div>
  
</template>


<script>
import target from "../public/images/bullseye.png"
import watch from "../public/images/stopwatch.png"
import cloud from "../public/images/cloud.png"


export default {
  name: 'App',
  data() {
    return {
      canvas: null,
      bullsEye: target,
      stopwatch: watch,
      cloud: cloud,
      score: 0,
      scores: [],
      start: false,
      timer: 5,
      gameOver: false,
      tx: 0,
      x: 0,
      y: 50,
      x2: 500,
      y2: 0,
      targetX: 0,
      targetY: 0,
      watchX: 0,
      watchY: 0,
      sx: 0,
      drawTarget: "",
      drawClock: "",
      time: "",
      test: false
    }
  },
  mounted() {
    const canv = document.getElementById("myCanvas")
    this.canvas = canv.getContext("2d")
  },
  methods: {
    startGame() {
      this.start = true
      this.gameOver = false
      this.score = 0
      this.countdown()
      this.drawBullsEye()
      this.scorePoints()
      this.finishGame()
    },
    countdown() {
      this.time = setInterval(() => {
        this.timer -= 1
      }, 1000)
    },
    drawBullsEye() {
      const ctx = this.canvas
      this.drawTarget = setInterval(() => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        this.targetX = Math.floor(Math.random() * 400 )
        this.targetY = Math.floor(Math.random() * 400 )
        const image = new Image()
        image.src = this.bullsEye
        image.onload = () => {
          ctx.drawImage(image, this.targetX, this.targetY, 40, 40)
        }
      }, 1000)
    },
    scorePoints(e) {
      this.tx = e.offsetX
      if (this.tx >= this.targetX && this.tx <= this.targetX + 40) {
        this.score += 10
      }
    },
    drawWatch() {
      const ctx = this.canvas   
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      this.watchX = Math.floor(Math.random() * 400 )
      this.watchY = Math.floor(Math.random() * 400 )
      const image = new Image()
      image.src = this.stopwatch
      ctx.drawImage(image, this.watchX, this.watchY, 40, 40)
    },
    addTime(e) {
      this.sx = e.offsetX
      if (this.sx >= this.watchX && this.sx <= this.watchX + 40) {
        this.timer += 10
      }
    },
    finishGame() {
      const ctx = this.canvas
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        clearInterval(this.drawTarget)
        clearInterval(this.time)
        this.gameOver = true
        this.start = false
        this.timer = 5
        this.scores.push(this.score)
        this.scores.sort((a,b) => b - a)
    }
  },
  watch: {
    timer: function()  {
      const randomTime1 = Math.floor(Math.random() * 50)
      const randomTime2 = Math.floor(Math.random() * 50)
      if (this.timer === 0) {
        this.finishGame()
      }
      if (this.timer === randomTime1 || this.timer === randomTime2) {
        this.drawWatch()
      }
    }
  }
}

</script>


<style >
@keyframes cloudMove {
  0%   {background-color:red; left:0px; top:0px;}
  25%  {background-color:yellow; left:200px; top:0px;}
  50%  {background-color:blue; left:200px; top:200px;}
  75%  {background-color:green; left:0px; top:200px;}
  100% {background-color:red; left:0px; top:0px;}
}

html, body {
  margin: 0;;
  height: 100%;
  font-family: 'Press Start 2P', cursive;
  background-image: url("../public/images/background.jpg");
  background-position: center; 
  background-repeat: no-repeat; 
  background-size: cover; 
}

#container {
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#myCanvas {
  border: 5px solid brown;
  background-color: #99ccff;
  cursor: crosshair;
}

#canvasContainer {
  position: relative;
}

h1 {
  text-align: center;
}

.score {
  position: absolute;
  top: 15%;
  left: 10px;  
}

button {
  position: absolute;
  left:50%;
  top:50%;
  transform: translate(-50%, -50%);
  margin-top: 30%;
  width: 15vh;
  height: 4vh;
  font-size: 1.5vh;
  font-family: 'Press Start 2P', cursive;
}

.timer {
  position: absolute;
  right: 5%;
  top: 15%;
}

.finalScore {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  position: absolute;
  left:50%;
  top:50%;
  transform: translate(-50%, -50%);
}

.finalScores{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.title {
  margin-bottom: 5%;
}

ol {
  padding:0;
}

.cloud1 {
  position: absolute;
  left:21%;
  top:30%;
  transform: translate(-50%, -50%);
  animation-name: cloudMove1;
  animation-duration: 4s;
}

.cloud2 {
  position: absolute;
  left:79%;
  top:45%;
  transform: translate(-50%, -50%);
}

</style>
