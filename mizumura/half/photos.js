function start(){
    var url = new URL(window.location.href);
var data = url.searchParams.get('data');
if(data == 'now'){
 e_d = data;
 j_d = "今";
 p_d = ['Snapseed.JPG','IMG_1555.JPG','IMG_0637.JPG','IMG_0635.JPG','IMG_0634.JPG'];
}else if(data == "first"){
    e_d = "First Day";
    j_d = "出会いの日";
    p_d = ['IMG_8508.JPG','IMG_8499.JPG','IMG_8498.JPG','IMG_8538.JPG'];
}else if(data == "school"){
    e_d = data;
    j_d = "学校";
    p_d = ['IMG_9182.JPG','IMG_9205.JPG','IMG_1792.JPG','IMG_9937.JPG','IMG_9187.JPG','IMG_1789.JPG','IMG_1790.JPG','IMG_1791.JPG','IMG_1787.JPG','IMG_0820.JPG','IMG_0047.JPG','IMG_1782.JPG'];
}else if(data == "date"){
    e_d = data;
    j_d = "二人の時間";
    p_d = ['IMG_1742.JPG','IMG_1743.JPG','IMG_1744.JPG','IMG_1745.JPG','IMG_1746.JPG','IMG_1784.JPG','IMG_1785.JPG','IMG_8726.JPG'];
}
//document.getElementById("sp").innerHTML = 'e_d';
document.getElementById("pre").innerHTML = j_d;
document.getElementById("pic").src = p_d[0];
for(a of p_d){
    var text = "<img src="+"\""+a+"\""+">";
    document.getElementById("top2").insertAdjacentHTML("beforeend",text);
}
}