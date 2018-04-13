let sprite
let linkMov = 0
let linkIzq = []
let linkDer = []
let frames = 0
let nivel = 0
let enemy
let enemyQua
let enemyDir = [1,1,1,1]
let linkX
let linkY
let linkI
let linkJ
let doorI 
let doorJ 
let doorF 
let bomb
let boom
let bombState = 0
let bombX
let bombY
let torch
let linkStay
let mapH
let mapW
let crops = []

let enemys
let map

function preload() {
	sprite = loadImage('img/map2.png')
	link = loadImage('img/Link.png')
	linkInv = loadImage('img/LinkInv.png')
	torch = loadGif('img/Torch(TMC).gif')
	linkStay = loadGif('img/Linkstay.gif')
	bomb = loadImage('img/Bomb.png')
	boom = loadImage('img/exp.png')
	enemy = loadGif('img/ChuChu.gif')

	soundFormats('mp3', 'wav');
  	dropBomb = loadSound('sounds/Bomb_Drop.wav');
  	blowBomb = loadSound('sounds/Bomb_Blow.wav');
  	dmgEnemy = loadSound('sounds/Poof.wav');
  	foundDoor = loadSound('sounds/Secret.wav');
  	dmgLink = loadSound('sounds/Link_Hurt.wav');
  	main = loadSound('sounds/Main.mp3');


  	linkIzq.push({x:354, y:93})
  	linkIzq.push({x:388, y:93})
  	linkIzq.push({x:417, y:93})
  	linkIzq.push({x:452, y:93})
  	linkIzq.push({x:484, y:93})
  	linkIzq.push({x:514, y:93})
  	linkIzq.push({x:548, y:93})
  	linkIzq.push({x:580, y:93})
  	linkIzq.push({x:612, y:93})
  	linkIzq.push({x:644, y:93})

  	linkDer.push({x:738, y:93})
  	linkDer.push({x:703, y:93})
  	linkDer.push({x:672, y:93})
  	linkDer.push({x:638, y:93})
  	linkDer.push({x:608, y:93})
	linkDer.push({x:577, y:93})
	linkDer.push({x:545, y:93})
	linkDer.push({x:510, y:93})
	linkDer.push({x:479, y:93})
	linkDer.push({x:447, y:93})

	crops.push({x: 0,y: 129,})
	crops.push({x: 288,y: 80,})
	crops.push({x: 272,y: 80,})
	crops.push({x: 464,y: 208,})
	crops.push({x: 15,y: 9,})
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(30)
	initGame(nivel)
	main.loop()
}

function draw() {
	background(80,208,72)
	let x
	let y
	
	//Tablero
	for (var i = 0; i < mapH; i++) {
		for (var j = 0; j < mapW; j++) {
			x = crops[map[i][j]].x
			y = crops[map[i][j]].y
			if(map[i][j]==2){
				image(torch,50*j,50*i,50,50,0,0,16,16)
			} else {
				if(map[i][j]==4){
					image(linkStay,50*j,50*i,50,50,0,0,18,26)
				} else {
					image(sprite,50*j,50*i,50,50,x,y,16,16)
				}
			}
		}
	}

	// Puerta
	if (map[doorI][doorJ] == 0){
		image(sprite,50*doorJ,50*doorI,50,50,413,92,22,20)
		if (doorF==0){
			foundDoor.play()
			doorF++
		}
	}
	if (doorI==linkI && doorJ==linkJ) {
		nivel++
		initGame(nivel)
	}

	//Movimientos Link

	//Link estatico
	if (linkMov==0){
		image(linkStay,linkX,linkY-10,50,50+5,0,0,18,26)
		
	}

	// Link Moviento Izquierda
	if(keyIsDown(65)){
		linkMov = 1
		linkJ = Math.round(linkX/50)
		if (linkY%50!=0) {
			linkY=linkI*50
		}
		if (map[linkI][linkJ-1]==0 || linkX%50!=0) {
			if (linkJ-1!=bombX/50 || linkI!=bombY/50 || linkX%50!=0) {
				//Animacion de movimiento
				if(frames>=9)
					frames=0
				frames++
				image(link,linkX,linkY-10,50+10,50+15,linkIzq[frames-1].x,linkIzq[frames-1].y,25,30)

				linkX+= -5
			}
		} else {
			linkMov=0
		}
	}
	// Link Moviento Derecha
	if(keyIsDown(68)){
		linkMov = 1
		linkJ = Math.round(linkX/50)
		if (linkY%50!=0) {
			linkY=linkI*50
		}
		if (map[linkI][linkJ+1]==0 || linkX%50!=0) {
			if (linkJ+1!=bombX/50 || linkI!=bombY/50 || linkX%50!=0) {
				//Animacion de movimiento
				if(frames>=9)
					frames=0
				frames++

				image(linkInv,linkX,linkY-10,50+10,50+15,linkDer[frames-1].x,linkDer[frames-1].y,25,30)

				linkX+= 5
			}
		} else {
			linkMov=0
		}

	}
	// Link Moviento Abajo
	if(keyIsDown(83)){
		linkMov = 1
		linkI = Math.round(linkY/50)
		if (linkX%50!=0) {
			linkX=linkJ*50
		}
		if (map[linkI+1][linkJ]==0 || linkY%50!=0) {
			if (linkI+1!=bombY/50 || linkJ!=bombX/50 || linkY%50!=0) {
				//Animacion de movimiento
				if(frames>=9)
					frames=0
				frames++
				image(link,linkX,linkY-10,50,50,16+32*frames-1,95,18,26)

				linkY+= 5	
			} 
		} else {
			linkMov=0
		}
	}

	// Link Moviento Arriba
	if(keyIsDown(87)){
		linkMov = 1
		linkI = Math.round(linkY/50)
		if (linkX%50!=0) {
			linkX=linkJ*50
		}
		if (map[linkI-1][linkJ]==0 || linkY%50!=0) {
			if (linkI-1!=bombY/50 || linkJ!=bombX/50 || linkY%50!=0) {
				//Animacion de movimiento
				if(frames>=9)
					frames=0
				frames++
				image(link,linkX,linkY,50,50,696+32*frames-1,95,18,26)

				linkY+= -5
			}
		} else {
			linkMov=0
		}
	}


	//Link daño

	//Link dañado por enemigo
	for (var i = 0; i < enemys.length; i++) {
		if ((linkX<=enemys[i][1] && linkX+35>=enemys[i][1]) && (linkY==enemys[i][0])) {
			dmgLink.play()
			initGame(0)
		}
		if ((linkX>=enemys[i][1] && linkX-35<=enemys[i][1]) && (linkY==enemys[i][0])) {
			dmgLink.play()
			initGame(0)
		}
		if ((linkY<=enemys[i][0] && linkY+20>=enemys[i][0]) && (linkX==enemys[i][1])) {
			dmgLink.play()
			initGame(0)
		}
		if ((linkY>=enemys[i][0] && linkY-20<=enemys[i][0]) && (linkX==enemys[i][1])) {
			dmgLink.play()
			initGame(0)
		}
	}

	//Link dañado por bomba
	if(bombState==2) {
		if ((linkX<=bombX && linkX+75>=bombX) && (linkY-20<=bombY && linkY+20>=bombY)) {
			dmgLink.play()
			initGame(0)
			bombState=0
		}
		if ((linkX>=bombX && linkX-75<=bombX) && (linkY-20<=bombY && linkY+20>=bombY)) {
			dmgLink.play()
			initGame(0)
			bombState=0
		}
		if ((linkY<=bombY && linkY+75>=bombY) && (linkX-20<=bombX && linkX+20>=bombX)) {
			dmgLink.play()
			initGame(0)
			bombState=0
		}
		if ((linkY>=bombY && linkY-75<=bombY) && (linkX-20<=bombX && linkX+20>=bombX)) {
			dmgLink.play()
			initGame(0)
			bombState=0
		}
	}
	

	//Enemigo

	//Enemigo moviento
	for (var i = 0; i < enemys.length; i++) {
		image(enemy,enemys[i][1],enemys[i][0],50,50,0,0,20,30)
		enemysMove(i)
	}
	//Enemigo Dañado
	for (var i = 0; i < enemys.length; i++) {
		if(bombState==2 && ((bombX<=enemys[i][1] && bombX+50>=enemys[i][1]) || (bombX>=enemys[i][1] && bombX-50<=enemys[i][1])) && (bombY>=enemys[i][0]-25 && bombY<=enemys[i][0]+25)) {
			enemys.splice(i,1)
			dmgEnemy.play()
		}
	}
	for (var i = 0; i < enemys.length; i++) {
		if(bombState==2 && ((bombY<=enemys[i][0] && bombY+50>=enemys[i][0]) || (bombY>=enemys[i][0] && bombY-50<=enemys[i][0])) && (bombX>=enemys[i][1]-25 && bombX<=enemys[i][1]+25)) {
			enemys.splice(i,1)
			dmgEnemy.play()
		}
	}
	
	//Bomba

	//Bomba cargando
	if (bombState==1)
		image(bomb,50*bombX/50,50*bombY/50,50,50,0,0,16,18)
	//Bomba explotando
	if (bombState==2){
		image(boom,50*bombX/50,50*bombY/50,50,50,0,0,32,32)
		if (map[bombY/50][(bombX/50)+1]==3 || map[bombY/50][(bombX/50)+1]==0) {
			image(boom,50*(bombX/50)+50,50*(bombY/50),50,50,32*5,0,32,32)
		}
		if (map[bombY/50][(bombX/50)-1]==3 || map[bombY/50][(bombX/50)-1]==0) {
			image(boom,50*(bombX/50)-50,50*(bombY/50),50,50,32*6,0,32,32)
		}
		if (map[bombY/50+1][(bombX/50)]==3 || map[bombY/50+1][(bombX/50)]==0) {
			image(boom,50*(bombX/50),50*(bombY/50)+50,50,50,32*4,0,32,32)
		}
		if (map[bombY/50-1][(bombX/50)]==3 || map[bombY/50-1][(bombX/50)]==0) {
			image(boom,50*(bombX/50),50*(bombY/50)-50,50,50,32*3,0,32,32)
		}
	}
}

//Movimiento enemigo
function enemysMove(i){
	let enemyJ = Math.round(enemys[i][1]/50)
	let enemyI = Math.round(enemys[i][0]/50)
	switch(enemyDir[i]){
		case 1:
			if (map[enemyI][enemyJ+1]==0 || enemys[i][1]%50!=0) {
				if (enemyJ+1!=bombX/50 || enemyI!=bombY/50 || enemys[i][1]%50!=0) {
					enemys[i][1]+= 1
				} else {
					enemyDir[i]=Math.floor((Math.random() * 4)+1)
				}
			} else {
				enemyDir[i]=Math.floor((Math.random() * 4)+1)
			}
		break
		case 2:
			if (map[enemyI+1][enemyJ]==0 || enemys[i][0]%50!=0) {
				if (enemyI+1!=bombY/50 || enemyJ!=bombX/50 || enemys[i][0]%50!=0) {
					enemys[i][0]+= 1
				} else {
					enemyDir[i]=Math.floor((Math.random() * 4)+1)
				}
			} else {
				enemyDir[i]=Math.floor((Math.random() * 4)+1)
			}
		break
		case 3:
			if (map[enemyI][enemyJ-1]==0 || enemys[i][1]%50!=0) {
				if (enemyJ-1!=bombX/50 || enemyI!=bombY/50 || enemys[i][1]%50!=0) {
					enemys[i][1]-= 1
				} else {
					enemyDir[i]=Math.floor((Math.random() * 4)+1)
				}
			} else {
				enemyDir[i]=Math.floor((Math.random() * 4)+1)
			}
		break
		case 4:
			if (map[enemyI-1][enemyJ]==0 || enemys[i][0]%50!=0) {
				if (enemyI-1!=bombY/50 || enemyJ!=bombX/50 || enemys[i][0]%50!=0) {
					enemys[i][0]-= 1
				} else {
					enemyDir[i]=Math.floor((Math.random() * 4)+1)
				}
			} else {
				enemyDir[i]=Math.floor((Math.random() * 4)+1)
			}
		break
	}
	
}

//Temporalizador bomba
function bombTimer() {
	let bombI = linkI
	let bombJ = linkJ
	//Rocas
	if (map[bombI][bombJ+1]==3)
		setTimeout(function(){ map[bombI][bombJ+1]=0 }, 3000)
	if (map[bombI][bombJ-1]==3)
		setTimeout(function(){ map[bombI][bombJ-1]=0 }, 3000)
	if (map[bombI+1][bombJ]==3)
		setTimeout(function(){ map[bombI+1][bombJ]=0 }, 3000)
	if (map[bombI-1][bombJ]==3)
		setTimeout(function(){ map[bombI-1][bombJ]=0 }, 3000)

	//Cambio de fase bomba
	setTimeout(function(){ bombState=2,blowBomb.play()}, 3000);
	setTimeout(function(){ bombState=0,bombX=0,bombY=0 }, 4000);
	}

//Tecla para poner bomba
function keyPressed () {
	if(keyCode === 32){
		if (bombState==0) {
		dropBomb.play()
		bombX = 50*Math.round(linkX/50)
		bombY = 50*Math.round(linkY/50)
		bombState = 1
		bombTimer()
		}
	}
	
}

//Link cuando deja de moverse
function keyReleased () {
		frames = 0
		linkMov = 0
	}

//Nuevo juego
const initGame = function (nivel) {
	doorI = 0
	doorJ = 0
	doorF = 0
	linkI = 1
	linkJ = 1
	linkX = 50
	linkY = 50
	mapH=5+2*4
	mapW=5+2*(8+nivel*3)
	enemyQua = 4+(nivel*2)

	//Cantidad de enemigos por nivel
	enemys=new Array(enemyQua)
	for (var i = 0; i < enemyQua; i++) {
		enemys[i]=new Array(2)
	}
	//Tamaño del tablero
	map=new Array(mapH)
	for (var i = 0; i < mapW; i++) {
		map[i]=new Array(mapW)
	}
	//Llenado del tablero
	for (var i = 0; i < mapH; i++) {
		for (var j = 0; j < mapW; j++) {
			if (j==0 || j==mapW-1 || i==0 || i==mapH-1) {
				map[i][j]=1
			}
			else{
				if (j%2==0 && i%2==0) {
					map[i][j]=2

				} else {
					if ((j>2 || i>2) && Math.floor((Math.random() * 3) + 1)==1 ) {
						map[i][j]=3
						if (doorJ==0 && doorI==0 && i>5 && j>9) {
							doorI=i
							doorJ=j
						}
					} else {
						map[i][j]=0
					}
					
				}
				
			}
			
		}
	}
	//Enemigo en posision aleatoria
	let rJ
	let rI
	for (var i = 0; i < enemys.length; i++) {
		do{
			rI=Math.floor((Math.random() * mapH))
			rJ=Math.floor((Math.random() * mapW))

		}while(map[rI][rJ]!=0 || rJ<3 || rI<5)
		enemys[i][0]=rI*50
		enemys[i][1]=rJ*50
	}
		
		
	
}