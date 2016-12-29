anguapp.factory('gameFactory',function(){
   factory={};
   var playerArr;
   this.player_arr =[];
   socket.on('key_pressed',function(x_of_chef){
   })
   factory.saveFormData = function(player,callback){
     factory.player = player;
     callback();
   }

   factory.playgame = function(playerArr,current_player,callback){
    var ctx, //context
      imgBg, //background Image
      x = 0,
      y = 0,
      noOfPizzas = 10,
      chef_image = [],
      fallingPizzas = [],
      stack =[], //Stack of Pizza
      chefimgx,    //x point where pizza has to stack
      pushed = false, //pushed to stack[]
      endpt, //The line to end
      pizza_itvl, //setinterval function
      endline,
      myReq,
      abc,
      end,
      start,
      keyevent= false,
      starttime,
      prevtime,
      requestAnimationFrame,
      cancelAnimationFrame ,
      timediff = 0;

      setup();

      function setup() {
          canvas = document.getElementById('canvasRegn');
          if (canvas.getContext) {
            ctx = canvas.getContext('2d');
            imgBg = new Image();
            imgBg.src = "restaurant2.png";
            for(var j = 0;j < playerArr.length; j++){
              chefimgx = new Object();
              chefimgx["image"] = new Image();
              chefimgx["name"] = playerArr[j].name;
              chefimgx["x"] = playerArr[j].X;//530;
              chefimgx["y"] = playerArr[j].Y;
              chefimgx["speed"] = 1;
              chefimgx["socketid"] = playerArr[j].socketid;
              chefimgx["stack"] =playerArr[j].stack;
              chefimgx["score"] =playerArr[j].score;
              endline= 650;
              abc = chefimgx.y - 10;
              endpt = abc;
              chef_image.push(chefimgx);
              //chef_image[0].image.onload();


              chefimgx.image.src = 'chef.png';
            }
            createPizza();
            socket.on('someone_disconected',function(index){
              chef_image.splice(index,1);
            })
            socket.on('you_disconected',function(index){
              callback(chef_image[index].score);
            })
            socket.on('key_pressed',function(chef){
                for(var i = 0; i < chef_image.length; i++){
                  if(chef_image[i].socketid === chef.socketid){
                    chef_image[i].x = chef.x;
                    chef_image[i].stack = chef.stack;
                    chef_image[i].score = chef.score;
                  }
                }
            })
            document.addEventListener("keydown", flagsetter, false);
            document.addEventListener("keyup", flagsetter, false);
            function flagsetter(e){
              if(e.keyCode == 39 || e.keyCode == 37 ) {
                keyevent = true;
              }
            }
            if(!myReq){window.requestAnimationFrame(draw);}
          }
      }

    function createPizza(){
      for(var i = 0; i < noOfPizzas; i++) {
            var fallingDr = new Object();
            fallingDr["image"] =  new Image();
            fallingDr.image.src = 'pizza2.png';
            fallingDr["x"] = Math.random() * 1000;
            fallingDr["y"] = Math.random() * 5;
            fallingDr["speed"] = 3 + Math.random() * 5;
            fallingPizzas.push(fallingDr);
              xpt = fallingPizzas[0].x;
          }
    }
// Falling of pizzas+
    function draw(timestamp) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(imgBg, 0, 0);      //draws background Img
      var flag = false;

    for(var z = 0; z < chef_image.length; z++){
         ctx.drawImage(chef_image[z].image, chef_image[z].x, chef_image[z].y);
      }
    moving_image();  //moving chef image
        for (var i=0; i< noOfPizzas; i++) {
            ctx.drawImage (fallingPizzas[i].image, fallingPizzas[i].x, fallingPizzas[i].y); //The rain drop
            fallingPizzas[i].y += fallingPizzas[i].speed;
            //Set the falling speed
            for(var index in chef_image){
             if(chef_image[index].socketid === current_player.socketid){
              if(fallingPizzas[i].x >chef_image[index].x-10 && fallingPizzas[i].x <chef_image[index].x+10){
              if(fallingPizzas[i].y > endpt){ //stack pizza when it reached endpt.
                  chef_image[index].stack.push(true);
                    pushed = true;
                    fallingPizzas[i].y = -25;
                    fallingPizzas[i].x = Math.random() * 1000;
                  }
                }
               }
              }
            if (fallingPizzas[i].y > endline) {  //Repeat the pizzadrop when it falls out of view
                fallingPizzas[i].y = -25;
                fallingPizzas[i].x =  Math.random() * 1000;
            }
        }
// Clone and Stack Pizzas
      if(pushed === true){
        for(var index in chef_image){
         if(chef_image[index].socketid === current_player.socketid){
           chef_image[index].score +=1;

         }
       }
       pushed = false;
      }
      for(var index in chef_image){
          for(var j = 0; j< chef_image[index].stack.length; j++){
            var s = fallingPizzas[0].image.cloneNode(true);
            endpt = abc-(j*15);
            ctx.drawImage(s, chef_image[index].x, endpt);
          }
        if(endpt <= 0){
          myReq = 1;
          socket.emit('disconecting',chef_image[index]);
        }
      }
      if(!myReq){
          window.requestAnimationFrame(draw);
      }
      else{
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font="30px Verdana";
        // Create gradient
        var gradient=ctx.createLinearGradient(0,0,canvas.width,0);
        gradient.addColorStop("0.2","magenta");
        gradient.addColorStop("0.4","blue");
        gradient.addColorStop("0.65","red");
        // Fill with gradient
        ctx.fillStyle=gradient;
        ctx.fillText("Congrats "+current_player.name+"! You completed!!",450,200);
        ctx.fillText("Checkout your score in the Dashboard",380,300);
      }
      //On window close or refresh
      window.addEventListener("beforeunload", function(e){
       socket.emit('disconecting',chef_image[index]);
      }, false);
    }


function moving_image(){

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

            function keyDownHandler(e) {
              if(keyevent === true){
                if(e.keyCode === 39) {
                  for(var i in chef_image){
                    if(chef_image[i].socketid === current_player.socketid){
                      if(chef_image[i].x < 1100){
                        chef_image[i].x += 0.04;
                        }
                      }
                    }
                  }
                  else if(e.keyCode == 37) {
                    for(var i in chef_image){
                      if(chef_image[i].socketid === current_player.socketid){
                        if(chef_image[i].x > 0){
                          chef_image[i].x -= 0.04;
                        }
                    }
                  }
                }
              }
            }
        function keyUpHandler(e) {
          if(keyevent === true){
            if(e.keyCode == 39) {
                rightPressed = false;
                for(var i in chef_image){
                  if(chef_image[i].socketid === current_player.socketid){
                    socket.emit('key_pressed',chef_image[i]);
                  }
                }
            }
            else if(e.keyCode == 37) {
                leftPressed = false;
                for(var i in chef_image){
                  if(chef_image[i].socketid === current_player.socketid){
                    socket.emit('key_pressed',chef_image[i]);
                  }
                }
            }
          }
          keyevent = false;
        }
    }


   }

  return factory;
})
