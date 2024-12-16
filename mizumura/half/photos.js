function start(){
    var url = new URL(window.location.href);
var data = url.searchParams.get('data');
if(data == 'now'){
 e_d = data;
 j_d = "今";
 p_d = [];
}else if(data == "first"){
    e_d = "First Day";
    j_d = "出会いの日";
    p_d = ['IMG_8508.JPG','IMG_8499.JPG','IMG_8498.JPG','IMG_8538.JPG'];
}else if(data == "school"){
    e_d = data;
    j_d = "学校";
    p_d = [];
}else if(data == "date"){
    e_d = data;
    j_d = "二人の時間";
    p_d = [];
}
//document.getElementById("sp").innerHTML = 'e_d';
document.getElementById("pre").innerHTML = j_d;
document.getElementById("pic").src = p_d[0];
for(a of p_d){
    var text = "<img src="+"\""+a+"\""+">";
    document.getElementById("top2").insertAdjacentHTML("beforeend",text);
}
}