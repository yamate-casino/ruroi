function start(){
    document.getElementById("p1").style.opacity =1;
    document.getElementById("p2").style.opacity =0;
    document.getElementById("p3").style.opacity =0;
    $("#p1").animate({
        'opacity':1
    },1000)
    $("#p2").animate({
        'opacity':0
    },1000)
    $("#p3").animate({
        'opacity':0
    },1000)

    $("#p1").animate({
        'opacity':0
    },1000)
    $("#p2").animate({
        'opacity':0
    },1000)
    $("#p3").animate({
        'opacity':0
    },1000)

    $("#p1").animate({
        'opacity':0
    },1000)
    $("#p2").animate({
        'opacity':1
    },1000)
    $("#p3").animate({
        'opacity':0
    },1000)

    $("#p1").animate({
        'opacity':0
    },1000)
    $("#p2").animate({
        'opacity':1
    },1000)
    $("#p3").animate({
        'opacity':0
    },1000)

    $("#p1").animate({
        'opacity':0
    },1000)
    $("#p2").animate({
        'opacity':0
    },1000)
    $("#p3").animate({
        'opacity':0
    },1000)

    $("#p1").animate({
        'opacity':0
    },1000)
    $("#p2").animate({
        'opacity':0
    },1000)
    $("#p3").animate({
        'opacity':1
    },1000)

    $("#p1").animate({
        'opacity':0
    },1000)
    $("#p2").animate({
        'opacity':0
    },1000)
    $("#p3").animate({
        'opacity':1
    },1000)
    $("#block1").animate({
        'opacity':1
    },8000)
    $("#block1").animate({
        'opacity':0
    },1000)
    setTimeout(start2,10000);
}
function start2(){
    document.getElementById("block1").style.display ="none";
    document.getElementById("block2").style.display ="block";
    document.getElementById("block2").style.opacity =1;
}