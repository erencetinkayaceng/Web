var BobContext ;
var area;

var areaW,areaH;

var kutum,kutum2;
var bRightBut = false,bDownBut = false,bLeftBut = false,bUpBut = false;
var Wbtn=false,Abtn=false,Sbtn=false,Dbtn=false;

var kutuBoyut=10;
var gameHandle=0;

var bob = new Image();
var objBob;

var oyuncu1gol=0;
var oyuncu2gol=0;

//Document ready function
$(function () {
    init();
});

	
//Initialisation
function init() {
 bob.src = 'resimler/top.png';
 area = document.getElementById("mycanvas");
 BobContext = area.getContext("2d");
 BobContext.clearRect(0, 0, area.width, area.height);

 areaW=area.width;
 areaH=area.height;

 objBob = new Top(200,area.height/2, 5, -5, 10);
 kutum= new kutu(kutuBoyut,area.height/2,kutuBoyut,kutuBoyut*5);
 kutum2= new kutu(area.width-kutuBoyut*2,area.height/2,kutuBoyut,kutuBoyut*5);

 gameHandle = setInterval(refreshScreen, 20);

    $(window).keydown(function (event) { // keyboard-down alerts
        switch (event.keyCode) {
            case 37: // 'Left' key
                bLeftBut = true;
                break;
			case 38: // 'UP' key
                bUpBut = true;
                break;
            case 39: // 'Right' key
                bRightBut = true;
                break;
			case 40: // 'Down' key
                bDownBut = true;
                break;
			case 65:
			    Abtn=true;
				break;
			case 87:
				Wbtn=true;
				break;
			case 68:
			    Dbtn=true;
				break;
			case 83:
				Sbtn=true;
				break;
			
				
        }
    });
    $(window).keyup(function (event) { // keyboard-up alerts
        switch (event.keyCode) {
            case 37: // 'Left' key
                bLeftBut = false;
                break;
			case 38: // 'UP' key
                bUpBut = false;
                break;
            case 39: // 'Right' key
                bRightBut = false;
                break;
			case 40: // 'Down' key
                bDownBut = false;
                break;
			case 65:
			    Abtn=false;
				break;			
			case 87:
				Wbtn=false;
				break;
			case 68:
			    Dbtn=false;
				break;
			case 83:
				Sbtn=false;
				break;	
        }
    });


}	
function refreshScreen() {
 clear();
  if (bRightBut &&  kutum2.x < BobContext.canvas.width-kutuBoyut )
        kutum2.x += 5; 
    else if (bLeftBut && BobContext.canvas.width/2 +(kutuBoyut/4)  < kutum2.x )
        kutum2.x -= 5;
    else if (bUpBut &&  0 < kutum2.y )
        kutum2.y -= 5;
	else if (bDownBut && kutum2.y < BobContext.canvas.height-kutuBoyut*5 )
        kutum2.y += 5;
		else if (Abtn &&  0 < kutum.x   )
			kutum.x -= 5;
		else if (Wbtn && 0 < kutum.y )
			kutum.y -= 5;
		else if (Dbtn &&  kutum.x < BobContext.canvas.width/2-(kutuBoyut))
			kutum.x += 5;
		else if (Sbtn && kutum.y < BobContext.canvas.height-kutuBoyut*5  )
			kutum.y += 5;
	
	//top duvar ile etkilesimi
	 if (objBob.y + objBob.dy - objBob.r > BobContext.canvas.height - 20 || objBob.y + objBob.dy - objBob.r < 0) {
        objBob.dy = -objBob.dy;
    }
	
	//kutular ile çarpışma
	if( (objBob.y> kutum.y-10 && objBob.y < kutum.y + kutum.b -10 ) && (objBob.x > kutum.x && objBob.x < kutum.x + kutum.e ) && (objBob.x < areaW/2)  ){
		objBob.dx = -objBob.dx;				
	}
	if( (objBob.y  > kutum2.y -10 && objBob.y < kutum2.y + kutum2.b -10 )&& (objBob.x > kutum2.x-15 && objBob.x < kutum2.x  )&& (objBob.x > areaW/2)){
		    objBob.dx = -objBob.dx;				
	}
	
	//kale 1 üst çarpişma
	if(objBob.x == 0 && (objBob.y<100)){
	objBob.dx = -objBob.dx ;
	}//kale1 alt çarpişma
	if(objBob.x == 0 && (objBob.y > 300)){
	objBob.dx = -objBob.dx ;
	}//kale 2 üst çarpişma
	if(objBob.x == areaW-5 &&  (objBob.y<100)){
	objBob.dx = -objBob.dx ;
	}//kale 2 alt çarpişma
	if(objBob.x == areaW-5 && (objBob.y > 300 )){
	objBob.dx = -objBob.dx ;
	}
	
	//Kale 1 gol durumu 
	if(objBob.x == 0 && (objBob.y >= 100 && objBob.y <= 300)){
	// 2. oyuncu gol attı
	oyuncu2gol++;
	objBob.x=500;
	objBob.y=areaH/2;
	}//kale 2 gol durumu
	if(objBob.x == areaW-5 && (objBob.y >= 100 && objBob.y <= 300)){
	// 1. oyuncu gol attı
	oyuncu1gol++;
	objBob.x=100;
	objBob.y=areaH/2;	
	}
	
	BobContext.beginPath();
	BobContext.fillStyle = 'red'; 
	BobContext.font="30px Arial";
	BobContext.fillText("Oyuncu 1: "+oyuncu1gol ,75,50);
	BobContext.fillText("Oyuncu 2: "+oyuncu2gol ,450,50);
	BobContext.fill();
	BobContext.closePath();
			
	//orta çizgi
	BobContext.beginPath();
	BobContext.fillStyle = '#fff'; 
	BobContext.moveTo(BobContext.canvas.width/2,0);
	BobContext.lineTo(BobContext.canvas.width/2,BobContext.canvas.height);
	BobContext.stroke();
	BobContext.closePath();
	
	//orta yuvarlak
	BobContext.beginPath();
	BobContext.arc(BobContext.canvas.width/2, BobContext.canvas.height/2, BobContext.canvas.width/20, 0, 2 * Math.PI, false);
	BobContext.fillStyle = 'green';
	BobContext.fill();
	BobContext.lineWidth = 2;
	BobContext.stroke();
	BobContext.closePath();
	
	//kale bir 
	BobContext.beginPath();
	BobContext.fillStyle = 'red';  
	BobContext.rect(0, 100,5,200);   
	BobContext.fill();
	BobContext.lineWidth = 1;
	BobContext.stroke();
	BobContext.closePath();
	
	
	//kale iki 
	BobContext.beginPath();
	BobContext.fillStyle = 'red';  
	BobContext.rect(BobContext.canvas.width-5, 100,5,200);   
	BobContext.fill();
	BobContext.lineWidth = 1;
	BobContext.stroke();
	BobContext.closePath();
	
	
	// kutu 2
	BobContext.beginPath();
	BobContext.rect(kutum.x, kutum.y, kutum.e, kutum.b);
	BobContext.fillStyle = '#000000';  
	BobContext.fill();
	BobContext.closePath();
	
   //kutu 1
	BobContext.beginPath();
	BobContext.rect(kutum2.x, kutum2.y, kutum2.e, kutum2.b);
	BobContext.fillStyle = '#000000';  
	BobContext.fill();
	
	//top yön
	objBob.x += objBob.dx;
	objBob.y += objBob.dy;
	
	//top çizim
	BobContext.drawImage(bob, objBob.x, objBob.y, 25, 25);
	BobContext.beginPath();
	BobContext.closePath();
	
}

function yenile(){
	oyuncu1gol=0;
	oyuncu2gol=0;
	objBob.x=100;
	objBob.y=areaH/2;
	objBob.dx = -objBob.dx;	
}

function clear() {
    BobContext.clearRect(0, 0, BobContext.canvas.width, BobContext.canvas.height);
    BobContext.fillStyle = '#fff';
    BobContext.fillRect(0, 0, BobContext.canvas.width, BobContext.canvas.height);
}

function kutu(x,y,e,b){
	this.x=x;
	this.y=y;
	this.b=b;
	this.e=e;
}

function Top(x, y, dx, dy, r) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
}

