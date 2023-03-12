let app = {};

(function(context){
    let levels = [];

    levels[0] = {
        map:[
            [1,1,0,0,1],
            [1,0,0,0,0],
            [0,0,1,1,0],
            [0,0,0,1,0],
            [0,1,0,1,0]
        ],
        player:{
            x: 0,
            y: 4
        },
        goal:{
            x: 4,
            y: 1
        },
        theme: 'default'
    };
    levels[1] = {
        map:[
           [1,0,1,1,1,1],
           [0,0,0,0,0,0],
           [0,1,1,1,0,0],
           [0,0,0,1,1,0],
           [0,1,0,1,0,0]
        ],
        theme: 'grassland',
        player:{
            x: 2,
            y: 4
        },
        goal:{
            x: 4,
            y: 4
        }
    };
    levels[2] = {
        map:[
           [1,0,1,0,0,1,0],
           [0,0,0,0,0,1,0],
           [1,0,1,1,0,0,0],
           [1,0,0,1,0,1,0],
           [1,1,0,0,1,0,0]
        ],
        theme:'dungeon',
        player:{
            x: 2,
            y: 4
        },
        goal:{
            x: 6,
            y: 4
        }
    };


    function Game(id, level){
        this.el = document.getElementById(id);
        this.level_idx = 0;
        this.tileTypes = ['floor', 'wall'];
        this.tileDim = 32;
        this.map = level.map;
        this.theme = level.theme;
        this.player = {...level.player};
        this.player.el = null;
        this.goal = {...level.goal};
    }

    Game.prototype.createEl = function(x,y,type) {
        let el = document.createElement('div');
        el.className = type;
        el.style.width = el.style.height = this.tileDim + 'px';
        el.style.left = x * this.tileDim + 'px';
        el.style.top = y * this.tileDim + 'px';

        return el;
    };

    Game.prototype.populateMap = function() {
        this.el.className = 'game-container ' + this.theme;
        let tiles = this.el.querySelector('#tiles');

        for(var y = 0; y < this.map.length; ++y){
            for(var x = 0; x < this.map[y].length; ++x){
                let tileCode = this.map[y][x];
                let tileType = this.tileTypes[tileCode];
                let tile = this.createEl(x,y,tileType);
                tiles.appendChild(tile);
            }
        }
    };

    Game.prototype.placeSprite = function(type){
        let x = this[type].x;
        let y = this[type].y;
        let sprite = this.createEl(x,y,type);

        sprite.id = type;
        sprite.style.borderRadius = this.tileDim + 'px';
        let layer = this.el.querySelector('#sprites');
        layer.appendChild(sprite);
        return sprite;
    };

    Game.prototype.collide = function(){
        this.player.el.className += ' collide';
        let obj = this;
        window.setTimeout(() => {
            obj.player.el.className = 'player';
        }, 200);

        return 0;
    };

    Game.prototype.moveLeft = function () {
        if(this.player.x == 0){
            this.collide();
            return;
        }

        let nextTile = this.map[this.player.y][this.player.x-1];

        if(nextTile == 1){
            this.collide();
            return;
        }

        this.player.x -= 1;
        this.updateHoriz();
    };

    Game.prototype.moveUp = function() {
        if(this.player.y == 0){
            this.collide();
            return;
        }

        let nextTile = this.map[this.player.y-1][this.player.x];
        if(nextTile == 1){
            this.collide();
            return;
        }

        this.player.y -= 1;
        this.updateVert(); 
    };

    Game.prototype.moveRight = function() {
        if(this.player.x == this.map[this.player.y].length-1){
            this.collide();
            return;
        }
        nextTile = this.map[this.player.y][this.player.x+1];

        if(nextTile == 1){
            this.collide();
            return;
        }

        this.player.x += 1;
        this.updateHoriz();
    };

    Game.prototype.moveDown = function() {
        if(this.player.y == this.map.length-1){
            this.collide();
            return;
        }

        let nextTile = this.map[this.player.y+1][this.player.x];
        if(nextTile == 1){
            this.collide();
            return;
        }
        this.player.y += 1;
        this.updateVert();
    };

    Game.prototype.updateVert = function(){
        this.player.el.style.top = this.player.y * this.tileDim + 'px';
    };

    Game.prototype.updateHoriz = function(){
        this.player.el.style.left = this.player.x * this.tileDim + 'px';
    };

    Game.prototype.movePlayer = function(event) {
        event.preventDefault();

        if(event.keyCode < 37 || event.keyCode > 40){
            return;
        }

        switch(event.keyCode){
            case 37:
                this.moveLeft();
            break;

            case 38:
                this.moveUp();
            break;

            case 39:
                this.moveRight();
            break;

            case 40:
                this.moveDown();
            break;
        }
    };

    Game.prototype.checkGoal = function() {
        let body = document.querySelector('body');

        if(this.player.y == this.goal.y &&
            this.player.x == this.goal.x) {
                body.className = 'success';
        }
        else{
            body.className = '';
        }
    };

    Game.prototype.changeLevel = function() {
        this.level_idx ++;

        if(this.level_idx > levels.length - 1){
            this.level_idx = 0;
        }

        let level = levels[this.level_idx];
        this.map = level.map;
        this.theme = level.theme;
        this.player = {...level.player};
        this.goal = {...level.goal}
    }

    Game.prototype.addMazeListener = function() {
        let map = this.el.querySelector('.game-map');
        let obj = this;
        map.addEventListener('mousedown', e => {
            if(obj.player.y != obj.goal.y ||
            obj.player.x != obj.goal.x){
                return;
            }

            obj.changeLevel();
            
            let layers = obj.el.querySelectorAll('.layer');
            for(layer of layers){
                layer.innerHTML = '';
            }

            obj.placeLevel();
            obj.checkGoal();
        });
    };

    Game.prototype.keyboardListener = function() {
        document.addEventListener('keydown', e => {
            this.movePlayer(e);
            this.checkGoal();
        });
    }

    Game.prototype.buttonListeners = function() {
        let up = document.getElementById('up');
        let left = document.getElementById('left');
        let down = document.getElementById('down');
        let right = document.getElementById('right');

        let obj = this;
        up.addEventListener('mousedown', () =>{
            obj.moveUp();
            obj.checkGoal();
        });
        down.addEventListener('mousedown', () =>{
            obj.moveDown();
            obj.checkGoal();
        });
        left.addEventListener('mousedown', () =>{
            obj.moveLeft();
            obj.checkGoal();
        });
        right.addEventListener('mousedown', () =>{
            obj.moveRight();
            obj.checkGoal();
        });
    }

    Game.prototype.setMessage = function(msg){
        let text_el = this.el.querySelector('.text');
        text_el.textContent = msg;
    };

    Game.prototype.sizeUp = function(){
        let map = this.el.querySelector('.game-map');
        map.style.height = this.map.length * this.tileDim + 'px';
        map.style.width = this.map[0].length * this.tileDim + 'px';
    };

    Game.prototype.placeLevel = function() {
        this.populateMap();
        this.sizeUp();
        this.placeSprite('goal');

        let playerSprite = this.placeSprite('player');
        this.player.el = playerSprite;
    }

    Game.prototype.addListeners = function() {
        this.keyboardListener();
        this.buttonListeners();
        this.addMazeListener();
    }

    context.init = function() {
        let myGame = new Game ('game-container-1', levels[0]);
        myGame.placeLevel();
        myGame.addListeners();
    }
})(app);


app.init()