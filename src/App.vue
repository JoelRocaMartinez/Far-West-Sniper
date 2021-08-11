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
            <li 
              v-for="points in orderedScores(scores).slice(0, 10)"
              :key="points.id"
              >
              {{ points }}
            </li>
          </ol>
        </div>
      </div>
      <div v-if="!gameOver">
        <img class="cloud1" src="../public/images/cloud.png" alt="cloud" width="200" height="100">
        <img class="cloud2" src="../public/images/cloud.png" alt="cloud" width="200" height="100">
      </div>
      <canvas 
        id="myCanvas" 
        width="500" 
        height="500"
        @click="scorePoints"
        />
      <button v-if="!start" @click="startGame">New Game</button>
      <button v-if="gameOver" @click="startGame">Restart</button>
    </div>    
  </div>
  
</template>


<script>
import target from "../public/images/bullseye.png"
import axios from "axios"
require('dotenv').config()


export default {
  name: 'App',
  data() {
    return {
      canvas: null,
      bullsEye: target,
      score: 0,
      scores: [],
      start: false,
      timer: 60,
      gameOver: false,
      tx: 0,
      targetX: 0,
      targetY: 0,
      drawTarget: "",
      time: "",
      secretURL: DATABASE_URL
    }
  },
  mounted() {
    const canv = document.getElementById("myCanvas")
    const apiURL = this.secretURL || 'http://localhost:5050'
    this.canvas = canv.getContext("2d")
    axios.get(apiURL).then((res) => {
      const points = res.data.map(x => x)
      this.scores = points
    }).catch(error => {
      console.log(error)
    })
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
        this.targetX = Math.floor(Math.random() * 450 )
        this.targetY = Math.floor(Math.random() * 450 )
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
    finishGame() {
      // create a highscore
      const apiURL = this.secretURL || 'http://localhost:5050'
      axios.post(apiURL, { score: this.score }).then(res => {
        this.scores.push(res.data)
      }).catch(error => {
        console.log(error)
      })
      
      const ctx = this.canvas
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      clearInterval(this.drawTarget)
      clearInterval(this.time)
      this.gameOver = true
      this.start = false
      this.timer = 60
    },
    orderedScores(scores) {
      console.log(scores)
      return scores.map(x => x.score).sort((a,b) => b - a)
    }
  },
  watch: {
    timer: function()  {
      if (this.timer === 0) {
        this.finishGame()
      }
    }
  }
}

</script>


<style >
@keyframes cloudMove1 {
  0% {
    position: absolute;
    left:21%;
    top:30%;
    transform: translate(-50%, -50%);
  }

  100% {
    position: absolute;
    left:79%;
    top:30%;
    transform: translate(-50%, -50%);
  }
}

@keyframes cloudMove2 {
  0% {
    position: absolute;
    left:79%;
    top:60%;
    transform: translate(-50%, -50%);
  }

  100% {
    position: absolute;
    left:21%;
    top:60%;
    transform: translate(-50%, -50%);
  }
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
  border: 5px solid rgb(128, 30, 30);
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

button:hover {
  cursor: crosshair;
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
  z-index: 100;
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
  animation-name: cloudMove1;
  animation-duration: 30s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: linear;
  z-index: -999;
  cursor: crosshair;
}

.cloud2 {
  animation-name: cloudMove2;
  animation-duration: 30s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: linear;
  z-index: -998;
  cursor: crosshair;
}

</style>
