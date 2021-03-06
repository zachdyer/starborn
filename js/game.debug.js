var game = game || {};

game.debug = {
    background: "rgba(0,0,0,0.9)",
    textColor: "white",
    linePosition: 40,
    drawX: 0,
    drawY: 0,
    count: 0,
    log: function (message) {
      game.ctx.fillText(message, 40, this.linePosition);
      this.linePosition += 20;
    },
    draw: {
      star: function() {
        var debug = game.debug;
        game.ctx.font = "10px Arial";
        game.ctx.textAlign = "left";
        game.ctx.fillStyle = debug.background;
        game.ctx.fillRect(20, 20, 200, 250);
        game.ctx.fillStyle = debug.textColor;
        debug.linePosition = 40;
        debug.log("player.x: " + Math.floor(game.player.x));
        debug.log("player.y: " + Math.floor(game.player.y));
        debug.log("player.galaxy.x: " + Math.floor(game.player.galaxy.x));
        debug.log("player.galaxy.y: " + Math.floor(game.player.galaxy.y));
        debug.log("chunk.x: " + game.chunk.x);
        debug.log("chunk.y: " + game.chunk.y);
        debug.log("FPS: " + game.debug.fps.rate);
        debug.log("Star Name: " + game.galaxy.starName(Math.floor(game.player.galaxy.x), Math.floor(game.player.galaxy.y)));
        debug.log("total planets: " + game.galaxy.planetCount(Math.floor(game.player.galaxy.x), Math.floor(game.player.galaxy.y)));
      }
    },
    drawLog: function () {
      game.ctx.font = "10px Arial";
      game.ctx.textAlign = "left";
      game.ctx.fillStyle = this.background;
      game.ctx.fillRect(20, 20, 200, 250);
      game.ctx.fillStyle = this.textColor;
      this.linePosition = 40;
      let x = Math.floor(game.player.x);
      let y = Math.floor(game.player.y);
      this.log("player.x: " + game.player.x.toFixed(1));
      this.log("player.y: " + game.player.y.toFixed(1));
      this.log("player.galaxy.x: " + Math.floor(game.player.galaxy.x));
      this.log("player.galaxy.y: " + Math.floor(game.player.galaxy.y));
      this.log("chunk.x: " + game.chunk.x);
      this.log("chunk.y: " + game.chunk.y);
      /* global noise */
      this.log("noise value: " + noise.simplex2(x, y));
      this.log("FPS: " + game.debug.fps.rate);
      this.log("Star Name: " + game.galaxy.starName(Math.floor(game.player.galaxy.x), Math.floor(game.player.galaxy.y)));
      this.log("total planets: " + game.galaxy.planetCount(Math.floor(game.player.galaxy.x), Math.floor(game.player.galaxy.y)));
    },
    drawGrid: function(){
        var scale = game.getScale();
        var tile = {
          width: game.tile.width * scale,
          height: game.tile.height * scale
        };
        
        game.ctx.lineWidth = 1;
        //Chunks are drawn 4 x 4
        for(var chunkX = game.chunk.x - 2; chunkX <= game.chunk.x + 2; chunkX++ ) {
          for(var chunkY = game.chunk.y - 2; chunkY <= game.chunk.y + 2; chunkY++) {
            game.ctx.strokeStyle = "red";
            for(var x = chunkX * game.chunk.width ; x < game.chunk.width  * chunkX + game.chunk.width; x++) {
              for(var y = chunkY * game.chunk.height ; y < game.chunk.height  * chunkY + game.chunk.height; y++) {
                
                game.ctx.strokeRect(
                    x * tile.width - game.player.x * tile.width + window.innerWidth / 2,
                    y * tile.height - game.player.y * tile.height  + window.innerHeight / 2,
                    tile.width,
                    tile.height 
                );
              }
            }
            //draw chunk
            game.ctx.strokeStyle = "lime";
            game.ctx.strokeRect(
              chunkX * game.chunk.width * tile.width - game.player.x * tile.width  + window.innerWidth / 2,
              chunkY * game.chunk.height * tile.height - game.player.y * tile.height  + window.innerHeight / 2,
              tile.width * game.chunk.width,
              tile.height * game.chunk.height 
            );
          }
        }
        
        
    },
    fps: {
      currentTime: 0,
    	lastTime: 0,
      rate: 50,
    	timePerTick: 17,
    	updateTime: Date.now(), //This sets a time stamp every second to update the game.debug.fps
    	get: function(currentTime, lastTime) {
    		var fps = 1000 / (this.currentTime - this.lastTime);
    		return fps.toFixed();
    	},
    	update: function() {
    		this.currentTime = Date.now();
    		if(this.currentTime - this.updateTime >= 1000) {
    			this.rate = this.get(this.currentTime, this.lastTime);
    			this.updateTime = this.currentTime;
    		}
    		this.timePerTick = this.currentTime - this.lastTime;
    		this.lastTime = this.currentTime;
    	}
    }
  }