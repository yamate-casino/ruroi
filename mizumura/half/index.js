function start(){
    var pic = document.getElementById("pic").clientHeight;
    pic = pic+'px';
    document.getElementById("dark").style.height = pic;
    console.log(pic)
    document.getElementById("body").style.opacity = 1;
}
function jump1(){
    location.href="/home/kazuya1834/Documents/山手学院/るろい/mizumura/half year/photos.html?data=first";
}
function jump2(){
    location.href="/home/kazuya1834/Documents/山手学院/るろい/mizumura/half year/photos.html?data=school";
}
function jump3(){
    location.href="/home/kazuya1834/Documents/山手学院/るろい/mizumura/half year/photos.html?data=date";
}
function jump4(){
    location.href="/home/kazuya1834/Documents/山手学院/るろい/mizumura/half year/photos.html?data=now";
}