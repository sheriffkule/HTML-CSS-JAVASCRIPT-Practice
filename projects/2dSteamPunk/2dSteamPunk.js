window.addEventListener('load', function () {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = 500;
  canvas.height = 500;

  class InputHandler {
    constructor(game){
        this.game = game;
        window.addEventListener('keydown', e => {
            if (((e.key === 'ArrowUp') ||
                (e.key === 'ArrowDown')
            ) && this.game.keys.indexOf(e.key) === -1){
                this.game.keys.push(e.key);
            } else if (e.key === ' '){
                this.game.player.shootTop();
            }
            console.log(this.game.keys);
        });

        window.addEventListener('keyup', e => {
            if (this.game.keys.indexOf(e.key) > -1){
                this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
            }
            console.log(this.game.keys);
        })
    }
  }

  class Projectile {
    constructor(game, x, y){
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 3;
        this.speed = 3;
        this.markedForDeletion = false;
    }
    update(){
        this.x += this.speed;
        if(this.x > this.game.width * 0.8) this.markedForDeletion = true;
    }
    draw(context){
        context.fillStyle = 'orange';
        fillRect(this.x, this.y, this.width, this.height);
    }
  }

  class Particle {

  }

  class Player {
    constructor(game) {
        this.game = game;
        this.width = 120;
        this.height = 190;
        this.x = 20;
        this.y = 100;
        this.speedY = 0;
        this.maxSpeed = 3;
        this.projectiles = [];
    }
    update() {
        if (this.game.keys.includes('ArrowUp')) this.speedY = -this.maxSpeed;
        else if (this.game.keys.includes('ArrowDown')) this.speedY = this.maxSpeed;
        else this.speedY = 0
        this.y += this.speedY;
        this.projectiles.forEach(projectile => {
            projectile.update();
        })
    }
    draw(context) {
        context.fillStyle = 'orange';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    shootTop(){
        this.projectiles.push(new Projectile(this.game, this.x, this.y))
    }
  }
  class Enemy {

  }

  class Layer {

  }

  class Background {

  }

  class UI {

  }

  class Game {
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.player = new Player(this);
        this.input = new InputHandler(this);
        this.keys = [];
    }
    update() {
        this.player.update();
    }
    draw(context) {
        this.player.draw(context)
    }
  }

  const game = new Game(canvas.width, canvas.height);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.update();
    game.draw(ctx);
    requestAnimationFrame(animate)
  }

  animate()
});
