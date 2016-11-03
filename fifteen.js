window.onload = function(){
	var puzzWon = false;
	var start = false;
	var puzzPieces = [];
	$("div div div").each(function(){puzzPieces.push($(this));});
	
	var initializePuzzle = function(){
		var xPos =0;
		var yPos = 0;
		var picTop =  0;
		var picLeft = 0;

		for(i=0;i<=puzzPieces.length-1;i++){
			
			initializePiece(puzzPieces[i],picTop+"px "+ picLeft+"px", xPos, yPos)
			xPos+=100;
			picTop-=100;

			if((i+1)%4==0){
				xPos=0;
				yPos+=100;
				picTop = 0;
				picLeft-=100;
			};
		};
		/*
		$("#shufflebutton").on("click",function(){
			console.log($(this).html());
			if($(this).html() == "Shuffle"){
				var p =0; 
				setInterval(function(){
					while(1){
					$("#shufflebutton").html(p);
					p +=1;
					}
					}),1000
					}
			});
			*/
		$("#shufflebutton").on("click",doShuffle);
	}

	function initializePiece(piece, picPosition, xPos, yPos){
		piece.css("background-position",picPosition.toString());
		piece.addClass("puzzlepiece");
		piece.css({top: yPos, left: xPos});
		piece.css("color: white");
		piece.on("click",function(){
			var move = ICanMove(piece);
			if(move != false){
				moveTile(piece,move);
			}
		piece.mousemove(win);
		});
	};
	
	function moveTile(tile,direction){
		var posX
		var posY
		var position = tile.position();
		
		switch (direction){
			case "U": 
				yPos = position.top-100;
				tile.animate({top : yPos.toString()});
				break;
			case "D": 
				yPos = position.top+100;
				tile.animate({top : yPos.toString()});
				break;
			case "L": 
				xPos = position.left-100;
				tile.animate({left : xPos.toString()});
				break;
			case "R": 
				xPos = position.left+100;
				tile.animate({left : xPos.toString()});
				break;
			}
		}
		
	function ICanMove(tile){
			var pos = tile.position();
			var moveUp = pos.top - 100;
			var moveDown = pos.top + 100;
			var moveRight = pos.left + 100;
			var moveLeft = pos.left - 100;
			
			var canMoveUp = (moveUp >= 0)&&(moveUp <= 300);
			var canMoveDown = (moveDown <= 300) && (moveDown >= 0);
			var canMoveRight = (moveRight <= 300) && (moveRight) >= 0;
			var canMoveLeft = (moveLeft <= 300) && (moveLeft >= 0);
			var found = false;
			
			if(canMoveUp){
				for(x=0;x<puzzPieces.length;x++){
					if(puzzPieces[x].position().top== moveUp){
						if(pos.left==puzzPieces[x].position().left){found=true;}
						}
					}
					if(found == false){return "U";}
					
				}
			found = false;
			if(canMoveDown){
				for(x=0;x<puzzPieces.length;x++){
					if(puzzPieces[x].position().top == moveDown){
						if(pos.left==puzzPieces[x].position().left){found=true;}
						}
					}
					if(found == false){return "D";}
				}
			found = false;
			if(canMoveLeft){
				for(x=0;x<puzzPieces.length;x++){
					if(puzzPieces[x].position().left== moveLeft){
						if(pos.top==puzzPieces[x].position().top){found=true;}
						}
					}
					if(found == false){return "L";}
				}
			found = false;
			if(canMoveRight){
				for(x=0;x<puzzPieces.length;x++){
					if(puzzPieces[x].position().left== moveRight){
						if(pos.top==puzzPieces[x].position().top){found=true;}
						}
					}
					if(found==false){return "R";}
				}
			return false;
		}
	function doShuffle(){
		start = true;
		if(puzzWon){
			$("#puzzlearea").css("background-image","none");
			for(var i = 0;i<=puzzPieces.length-1;i++){
				puzzPieces[i].fadeIn();
			}
			initializePuzzle();
			puzzWon = false;
			}
		var j = 0;
		var timeout = 62;
		var id = setInterval(function(){shuffle();},800);
		
		function shuffle(){
				var moveable =[];
				for(y=0;y<puzzPieces.length;y++){
					var move = ICanMove(puzzPieces[y]);
					if(move != false){
						moveable.push([puzzPieces[y],move]);
						j+=1;
					}
				}
				var rand = Math.floor((Math.random() * moveable.length));
				console.log(j);
				console.log(timeout)
				moveTile(moveable[rand][0],moveable[rand][1])
				if(j > timeout){setInterval(function(){
					clearInterval(id);
					clearInterval(this);
					},1000);}
		}
	}
	function win(){
		var xPos = 0;
		var	yPos = 0;
		var won = true;
		for(q=0;q<puzzPieces.length;q++){
			if(puzzPieces[q].position().top!= yPos || puzzPieces[q].position().left!= xPos){
				won = false; break;
			};
			xPos+=100;
			if((q+1)%4==0){
				xPos=0;
				yPos+=100;
			};
		};
		if(won && start==true){
			puzzWon = true;
			start = false;
			$("#puzzlearea").css("background-image","url(background.jpg)");
			for(var i = 0;i<=puzzPieces.length-1;i++){
				puzzPieces[i].fadeOut();
			}
			return true;
		}
		return false;
	}
	
	initializePuzzle()
};
