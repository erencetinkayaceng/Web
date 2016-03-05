var KuleContext;
var alan;

var alanG, alanY;

var btnSag = false, btnSol = false;

var karakterResim = new Image();
var karakter;
var karakterBoyutu = 30;

var karakterHareketpx = 5
var yanCizgiHareketpx = 2;
var basamakHareketpx = 2;

var basamakBoyu = 5;
var basamakSayisi = 8;

var yanSol1R = new Image();
var yanSol2R = new Image();
var yanSol3R = new Image();
var yanSag1R = new Image();
var yanSag2R = new Image();
var yanSag3R = new Image();

var yanSol1, yanSol2, yanSol3, yanSag1, yanSag2, yanSag3;

var basamaklar = [];

var yol = 0;
var oyunDevam = 0;
var ekranHizi = 9;


function KarakterNesnesi(x, y) {
    this.x = x;
    this.y = y;
}
function YanNesne(yanX, yanY, yanEn, yanBoy) {
    this.yanX = yanX;
    this.yanY = yanY;
    this.yanEn = yanEn;
    this.yanBoy = yanBoy;
}
function BasamakNesnesi(bx, by, bEn, bBoy) {
    this.bx = bx;
    this.by = by;
    this.bEn = bEn;
    this.bBoy = bBoy;
}

//Sayfa ilk açılışta çalışacak
$(function () {
    init();
});

//İlkleme işlemini yapıyoruz
function init() {
    karakterResim.src = 'resimler/top.png';

    yanSol1R.src = 'resimler/yan.png';
    yanSol2R.src = 'resimler/yan.png';
    yanSol3R.src = 'resimler/yan.png';
    yanSag1R.src = 'resimler/yan.png';
    yanSag2R.src = 'resimler/yan.png';
    yanSag3R.src = 'resimler/yan.png';

//Alanın özelliklerini alıyoruz
    alan = document.getElementById("cizimAlani");
    KuleContext = alan.getContext("2d");
    KuleContext.clearRect(0, 0, alan.width, alan.height);

    alanG = alan.width;
    alanY = alan.height;

//Nesnelerimizi tanımlıyoruz
    karakter = new KarakterNesnesi(alanG / 2 - karakterBoyutu / 2, alanY - karakterBoyutu, 0, 0);

    yanSol1 = new YanNesne(0, 0, 10, 100);
    yanSol2 = new YanNesne(0, 200, 10, 100);
    yanSol3 = new YanNesne(0, 400, 10, 100);
    yanSag1 = new YanNesne(alanG - 10, 0, 10, 100);
    yanSag2 = new YanNesne(alanG - 10, 200, 10, 100);
    yanSag3 = new YanNesne(alanG - 10, 400, 10, 100);

    basamaklariOlustur();

    //oyuna süreklilik sağlıyoruz
    oyunDevam = setInterval(ekranYenile, ekranHizi);

    klavyeDegerAl();

}

//Bu fonksiyonda çizimlerimizi yaptırıyoruz
function ekranYenile() {
    oyunAlaniniTemizle();

    //Karakter çizim
    KuleContext.drawImage(karakterResim, karakter.x, karakter.y, karakterBoyutu, karakterBoyutu);
    KuleContext.beginPath();
    KuleContext.closePath();

    yanCizgileriOlustur();
    yanCizgiHareket();

    karakterHareket();

    basamaklarHareket();

    oyunDevamKontrol();

    oyunHizAyari();
}

function karakterHareket() {
    if (btnSol) {
        karakter.x += -karakterHareketpx;
    } else if (btnSag) {
        karakter.x += +karakterHareketpx;
    }
    // soldan çıkmaz
    if (karakter.x < 10 && btnSol) {
        karakter.x = 10;
    }// sağdan çıkmaz
    else if (karakter.x > alanG - 10 - karakterBoyutu && btnSag) {
        karakter.x = alanG - 10 - karakterBoyutu;
    }
    carpismaKontrol();

}

function oyunAlaniniTemizle() {
    KuleContext.clearRect(0, 0, KuleContext.canvas.width, KuleContext.canvas.height);
    KuleContext.fillStyle = '#fff';
    KuleContext.fillRect(0, 0, KuleContext.canvas.width, KuleContext.canvas.height);
}

function klavyeDegerAl() {
    $(window).keydown(function (event) { // keyboard-down alerts
        switch (event.keyCode) {
            case 37: // 'Left' key
                btnSol = true;
                break;

            case 39: // 'Right' key
                btnSag = true;
                break;
        }
    });
    $(window).keyup(function (event) { // keyboard-up alerts
        switch (event.keyCode) {
            case 37: // 'Left' key
                btnSol = false;
                break;

            case 39: // 'Right' key
                btnSag = false;
                break;
        }
    });

}

function yanCizgileriOlustur() {

    //yansol1 çizim
    KuleContext.drawImage(yanSol1R, yanSol1.yanX, yanSol1.yanY, yanSol1.yanEn, yanSol1.yanBoy);
    KuleContext.beginPath();
    KuleContext.closePath();
    //yansol2 çizim
    KuleContext.drawImage(yanSol2R, yanSol2.yanX, yanSol2.yanY, yanSol2.yanEn, yanSol2.yanBoy);
    KuleContext.beginPath();
    KuleContext.closePath();
    //yansol3 çizim
    KuleContext.drawImage(yanSol3R, yanSol3.yanX, yanSol3.yanY, yanSol3.yanEn, yanSol3.yanBoy);
    KuleContext.beginPath();
    KuleContext.closePath();
    //yansag1 çizim
    KuleContext.drawImage(yanSag1R, yanSag1.yanX, yanSag1.yanY, yanSag1.yanEn, yanSag1.yanBoy);
    KuleContext.beginPath();
    KuleContext.closePath();
    //yansag2 çizim
    KuleContext.drawImage(yanSag2R, yanSag2.yanX, yanSag2.yanY, yanSag2.yanEn, yanSag2.yanBoy);
    KuleContext.beginPath();
    KuleContext.closePath();
    //yansag3 çizim
    KuleContext.drawImage(yanSag3R, yanSag3.yanX, yanSag3.yanY, yanSag3.yanEn, yanSag3.yanBoy);
    KuleContext.beginPath();
    KuleContext.closePath();

}

function yanCizgiHareket() {

    if (yanSol1.yanY >= alanY) {
        yanSol1.yanY = -25;
    } else {
        yanSol1.yanY += yanCizgiHareketpx;
    }

    if (yanSol2.yanY >= alanY) {
        yanSol2.yanY = -25;
    } else {
        yanSol2.yanY += yanCizgiHareketpx;
    }

    if (yanSol3.yanY >= alanY) {
        yanSol3.yanY = -25;
    } else {
        yanSol3.yanY += yanCizgiHareketpx;
    }

    if (yanSag1.yanY >= alanY) {
        yanSag1.yanY = -25;
    } else {
        yanSag1.yanY += yanCizgiHareketpx;
    }

    if (yanSag2.yanY >= alanY) {
        yanSag2.yanY = -25;
    } else {
        yanSag2.yanY += yanCizgiHareketpx;
    }

    if (yanSag3.yanY >= alanY) {
        yanSag3.yanY = -25;
    } else {
        yanSag3.yanY += yanCizgiHareketpx;
    }

}

function basamaklariOlustur() {
    var indis;
    var x, en;
    var y = 0;
    for (indis = 0; indis <= basamakSayisi; indis++) {

        do {
            x = 10 + Math.random() * 300;
            en = 75 + Math.random() * 200;
        } while (x + en > alanG - 10);// konumu + eni sağdan fazla olmamasını sağlıyoruz

        //2 ve 3 katlarında köşelerden çıkmayı garanti ediyoruz
        if ((indis % 2) == 0 && !(x > 10 && x < karakterBoyutu - 2)) {
            do {
                x = 10 + Math.random() * 300;
            } while (!(10 < x && x < karakterBoyutu - 2));// 

        } else if ((indis % 3) == 0 && !(x + en > alanG - karakterBoyutu - 8 && x + en < alanG - 10)) {
            do {
                x = 10 + Math.random() * 300;
                en = 75 + Math.random() * 200;
            } while (!(x + en > alanG - karakterBoyutu - 8 && x + en < alanG - 10));// 

        }

        y -= 70;//her basamak arasına uzaklık koyuyoruz
        basamaklar[indis] = new BasamakNesnesi(x, y, en, basamakBoyu);
    }
}

function basamaklarHareket() {
    var indis2;
    var x2, en2;
    var b;
    for (indis2 = 0; indis2 <= basamakSayisi; indis2++) {
        b = basamaklar[indis2];
        //basamakların çizdirilme olayı
        KuleContext.beginPath();
        KuleContext.fillStyle = 'red';
        KuleContext.rect(b.bx, b.by += basamakHareketpx, b.bEn, b.bBoy);
        KuleContext.fill();
        KuleContext.lineWidth = 1;
        KuleContext.stroke();
        KuleContext.closePath();

        //basamak alttan çıktı ise üstten tekrar girer
        if (b.by == alanY) {
            do {
                x2 = 10 + Math.random() * 300;
                en2 = 75 + Math.random() * 200;
            } while (x2 + en2 > alanG - 10); //konumu + eni sağdan fazla olmamasını sağlıyoruz

            //2 ve 3 katlarında köşelerden çıkmayı garanti ediyoruz
            if ((indis2 % 2) == 0 && !(x2 > 10 && x2 < karakterBoyutu - 2)) {
                do {
                    x2 = 10 + Math.random() * 300;
                } while (!(10 < x2 && x2 < karakterBoyutu - 2));// 

            } else if ((indis2 % 2) == 1 && !(x2 + en2 > alanG - karakterBoyutu - 8 && x2 + en2 < alanG - 10)) {
                do {
                    x2 = 10 + Math.random() * 300;
                    en2 = 75 + Math.random() * 200;
                } while (!(x2 + en2 > alanG - karakterBoyutu - 8 && x2 + en2 < alanG - 10));// 

            }

            b.bx = x2;
            b.bEn = en2;
            b.by = 0;
        }
    }

}

function carpismaKontrol() {

    var carpti;
    var b0 = basamaklar[0];
    var b1 = basamaklar[1];
    var b2 = basamaklar[2];
    var b3 = basamaklar[3];
    var b4 = basamaklar[4];
    var b5 = basamaklar[5];
    var b6 = basamaklar[6];
    var b7 = basamaklar[7];
    var b8 = basamaklar[8];

//topumuzun basamaklar ile olan çarpışmalarının kontrolu
    if ((b0.by + basamakBoyu >= karakter.y && b0.by < karakter.y) && ((b0.bx <= karakter.x && b0.bx + b0.bEn >= karakter.x) || (b0.bx <= karakter.x + karakterBoyutu && b0.bx + b0.bEn >= karakter.x + karakterBoyutu))) {
        carpti = true;
    } else if ((b1.by + basamakBoyu >= karakter.y && b1.by < karakter.y) && ((b1.bx <= karakter.x && b1.bx + b1.bEn >= karakter.x) || (b1.bx <= karakter.x + karakterBoyutu && b1.bx + b1.bEn >= karakter.x + karakterBoyutu))) {
        carpti = true;
    } else if ((b2.by + basamakBoyu >= karakter.y && b2.by < karakter.y) && ((b2.bx <= karakter.x && b2.bx + b2.bEn >= karakter.x) || (b2.bx <= karakter.x + karakterBoyutu && b2.bx + b2.bEn >= karakter.x + karakterBoyutu))) {
        carpti = true;
    } else if ((b3.by + basamakBoyu >= karakter.y && b3.by < karakter.y) && ((b3.bx <= karakter.x && b3.bx + b3.bEn >= karakter.x) || (b3.bx <= karakter.x + karakterBoyutu && b3.bx + b3.bEn >= karakter.x + karakterBoyutu))) {
        carpti = true;
    } else if ((b4.by + basamakBoyu >= karakter.y && b4.by < karakter.y) && ((b4.bx <= karakter.x && b4.bx + b4.bEn >= karakter.x) || (b4.bx <= karakter.x + karakterBoyutu && b4.bx + b4.bEn >= karakter.x + karakterBoyutu))) {
        carpti = true;
    } else if ((b5.by + basamakBoyu >= karakter.y && b5.by < karakter.y) && ((b5.bx <= karakter.x && b5.bx + b5.bEn >= karakter.x) || (b5.bx <= karakter.x + karakterBoyutu && b5.bx + b5.bEn >= karakter.x + karakterBoyutu))) {
        carpti = true;
    } else if ((b6.by + basamakBoyu >= karakter.y && b6.by < karakter.y) && ((b6.bx <= karakter.x && b6.bx + b6.bEn >= karakter.x) || (b6.bx <= karakter.x + karakterBoyutu && b6.bx + b6.bEn >= karakter.x + karakterBoyutu))) {
        carpti = true;
    } else if ((b7.by + basamakBoyu >= karakter.y && b7.by < karakter.y) && ((b7.bx <= karakter.x && b7.bx + b7.bEn >= karakter.x) || (b7.bx <= karakter.x + karakterBoyutu && b7.bx + b7.bEn >= karakter.x + karakterBoyutu))) {
        carpti = true;
    } else if ((b8.by + basamakBoyu >= karakter.y && b8.by < karakter.y) && ((b8.bx <= karakter.x && b8.bx + b8.bEn >= karakter.x) || (b8.bx <= karakter.x + karakterBoyutu && b8.bx + b8.bEn >= karakter.x + karakterBoyutu))) {
        carpti = true;
    } else {
        carpti == false;
    }


    if (carpti == true) {
        karakter.y += basamakHareketpx;
    } else {
        karakter.y -= basamakHareketpx;
    }

}

function oyunDevamKontrol() {

    yol += 0.1;
    var yolInt = parseInt(yol);

    //top üstten çıktı ise oyunu kazandı
    if (karakter.y < 0) {
        clearInterval(oyunDevam);
		oyunAlaniniTemizle();
        
        KuleContext.beginPath();
        KuleContext.fillStyle = 'red';
        KuleContext.font = "30px Arial";
        KuleContext.fillText("Tebrikler Kazandiniz.", 75, alanY / 2);
        KuleContext.fillText(" Yaptiginiz yol : " + yolInt + " m", 75, alanY / 2 + 50);
        KuleContext.fill();
        KuleContext.closePath();

    }//top alttan çıktı ise oyunu kaybetti 
    else if (karakter.y > alanY) {
        clearInterval(oyunDevam);
        oyunAlaniniTemizle();
        KuleContext.fillStyle = 'red';
        KuleContext.font = "30px Arial";
        KuleContext.fillText("Kaybettiniz.", 140, alanY / 2);
        KuleContext.fillText(" Yaptiginiz yol : " + yolInt + " m", 75, alanY / 2 + 50);
        KuleContext.fill();
        KuleContext.closePath();
    }//top oyun alanında ise yolu yeniliyoruz
    else {
        KuleContext.beginPath();
        KuleContext.fillStyle = 'red';
        KuleContext.font = "30px Arial";
        KuleContext.fillText("Yapilan Yol: " + yolInt + "m", 95, 50);
        KuleContext.fill();
        KuleContext.closePath();
    }

}

function oyunHizAyari() {
//burada oyunumuza ek özellikler katıyoruz hız değerlerini değiştiriyoruz
    var yolInt = parseInt(yol);
    if (yolInt == 250) {
        ekranHizi = 8;
        karakterHareketpx = 4;
        clearInterval(oyunDevam);
        oyunDevam = setInterval(ekranYenile, ekranHizi);
    } else if (yolInt == 400) {
        ekranHizi = 7;
        karakterHareketpx = 3;
        clearInterval(oyunDevam);
        oyunDevam = setInterval(ekranYenile, ekranHizi);
    } else if (yolInt == 600) {
        ekranHizi = 6;
        karakterHareketpx = 2;
        clearInterval(oyunDevam);
        oyunDevam = setInterval(ekranYenile, ekranHizi);
    } else if (yolInt == 900) {
        ekranHizi = 5
        karakterHareketpx = 1;
        clearInterval(oyunDevam);
        oyunDevam = setInterval(ekranYenile, ekranHizi);
    }

}

function yenile() {
    window.location.reload(false);
}


