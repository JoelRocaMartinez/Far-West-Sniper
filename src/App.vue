<template>

  <div id="container">
    <div id="canvasContainer">
      <h1>Duck Sniper</h1>
      
      <div v-if="start" class="score">score: {{ score }}</div>
      <div v-if="start" class="timer">{{ timer }}</div>
      <div v-if="gameOver" class="finalScore">
        <div class="title">Final Score</div>
        <div>{{ score }}</div>
        <ol>
          <div>High Scores</div>
          <li v-for="points in scores.slice(0, 10)" :key="points.id">
            {{ points }}
          </li>
        </ol>
      </div>
      <canvas 
        id="myCanvas" 
        width="500" 
        height="500"
        @click="scorePoints"
        v-on:click="addTime"
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
      this.addTime()
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
      image.onload = () => {
        ctx.drawImage(image, this.watchX, this.watchY, 40, 40)
      }
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
      if (this.timer === 0) {
        this.finishGame()
      }
      if (this.timer === 20 || this.timer === 40) {
        this.drawWatch()
      }
    }
  }
}

</script>


<style >
html, body {
  margin: 0;;
  height: 100%;
  font-family: 'Press Start 2P', cursive;
}

#container {
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#myCanvas {
  border: 2px solid black;
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
  margin-top: 20%;
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  left:50%;
  top:50%;
  transform: translate(-50%, -50%);
}

.title {
  margin-bottom: 5%;
}


</style>
