//分組

var one=[];
var two=[];
var three=[];
var four=[];
var five=[];

$(document).ready(function(){
 // for(var i=0 ; i<12 ; i++){
 
 // }
 //console.log(card_list[0].src);

})
//新增一張卡片背面
function addOption(){
    //$('.memory-game').afert('<div class="memory-card" data-framework="react">');
    console.log(card_list);
    
    card_list.forEach(element => {
    //console.log(card_list.indexOf(element));
    //console.log(element); 
    var j=card_list.indexOf(element)+1;//計算該項目次序 
    //以下分五組
    console.log(j%4); 
    if(j%5==0){}
    switch (j%5) {
      case 1:
        one.push(element)
        break;
      case 2:
        two.push(element)
        break;
      case 3:
        three.push(element)
         break;
      case 4:
        four.push(element)
         break;
      case 0:
        five.push(element)
          break;
        
    }
    

    $('[data-framework='+j+']').append('<img class="front-face" src="img/'+element.src+'"alt="React"/>');
    
    $('[data-framework='+j+']').append('<img class="back-face" src="img/back1.png" alt="back"/>');// 動態新增卡牌
    
    // var text=element.name;
		// var value=element.name;
    // $('.teacher').append('<option value='+value+'>'+text+'</option>');// 動態新增選項
  });
  }


function shuffle(poker,x){ //將傳來的陣竟亂序
        var tmp ;
        var t = 0;
        for (var i = 0; i < poker.length; i++) {
            t = Math.floor((Math.random() * x) + 1);
            tmp = poker[i];
            poker[i] = poker[t];
            poker[t] = tmp;
        }       
        //console.log(poker);
        card_list=poker;//將陣列回傳定為原本的陣列
        console.log(card_list);
        //console.log(Object.keys(poker)[2]);

        Object.keys(poker)[1];


}

 
  
function flipCard(){
  this.classList.add('flip');
}

function attackEvent(){

    role.hp=role.hp-ignoreNegative(gun_short-gun)-ignoreNegative(sword_short-sword)-ignoreNegative(arrow_short-arrow)-attack;
}

function encounter()
{

}

function ignoreNegative(num){
    if (num <0)
    {
     num=0;
     return num;
    }
    else
     return num
}