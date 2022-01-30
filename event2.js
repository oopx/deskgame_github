//初始化
function setStart(){   
  shuffle(card_list,24);//陣列，數量洗牌
  addOption();//戴入卡片
  setActive();//初始化下五張為active

  
  //偶數牌及底五張設為flip
  for(i=0;i<=20;i=i+2){
  var tem='[data-framework='+String(i)+']';
  if(tem<0){return};//不能用break 會跳出整個ready函式
  $(tem).addClass('flip');
  }
  $('[data-framework=21]').addClass('flip');
  $('[data-framework=22]').addClass('flip');
  $('[data-framework=23]').addClass('flip');
  $('[data-framework=24]').addClass('flip');
  $('[data-framework=25]').addClass('flip');
} 

//新增一張卡片背面
function addOption(){
    //$('.memory-game').afert('<div class="card" data-framework="react">');
    console.log(card_list);
    
    card_list.forEach(element => {
      //console.log(card_list.indexOf(element));
      //console.log(element); 
      var j=card_list.indexOf(element)+1;//計算該項目次序 
      element.order=j;//設定每張的位置
      //以下分五組
      console.log(j%4); 
      

      

      $('[data-framework='+j+']').append('<img class="front-face" src="img/'+element.src+'"alt="React"/>');
      
      $('[data-framework='+j+']').append('<img class="back-face" src="img/back1.png" alt="back"/>');// 動態新增卡牌
      
      // var text=element.name;
      // var value=element.name;
      // $('.teacher').append('<option value='+value+'>'+text+'</option>');// 動態新增選項
  });
  };

//將傳來的陣竟亂序
function shuffle(poker,x){ 
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


};

//設定最後一張為Active
function setActive(){
  $('[data-framework=21]').addClass('active');
  $('[data-framework=22]').addClass('active');
  $('[data-framework=23]').addClass('active');
  $('[data-framework=24]').addClass('active');
  $('[data-framework=25]').addClass('active');


};

//設點擊完的上一張卡為active
function setNextActive(framwork){
  var tem='[data-framework='+String(framwork-5)+']';
   if(tem<0){return};//不能用break 會跳出整個ready函式
   $(tem).addClass('flip active');

};

//點擊該卡效果
function getCard(framework){
  var clickCard=card_list[framework-1]
  console.log(clickCard);
  clickCard.attackEvent();



}
//負值為0
function ignoreNegative(num){
  if (num <0)
  {
   num=0;
   return num;
  }
  else
   return num
}