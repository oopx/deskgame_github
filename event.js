var role;
var choose,chooseattack;//標示目前的武器槽
var other;
var level=1;
var doWhat=1;//確定當前要做什麼 1為打怪，2為休息，3為移除，4學習，5血祭
var card_list=[];//場面上的牌組
var card_list1=[];
var card_list2=[];
var card_list3=[];




//結束行動，使不可按行動，並變色
function endAction(fromThis,isAble){
    $(".remove,.rest,.attack").attr('disabled',isAble);//判定按扭能否再次使用
        
    if(fromThis=="")return;//若未回傳，則不執行消失卡牌    
    setUsed(fromThis);//點的卡消失
    notActive()// 不可再點卡
}

//切換回合系統
function othersTurn(){
  if (role==role1)//換role2
      {
      console.log("turn");
      role=role2;
      other=role1;
      $("#role2,.role2").addClass("your_turn");
      $("#role1,.role1").removeClass("your_turn");
      $('#toolList_role2').addClass('your_turn');
      $("#toolList_role1").removeClass("your_turn");
      } 
  else{//換role1
      role=role1;
      other=role2;
      $("#role1,.role1").addClass("your_turn");
      $("#role2,.role2").removeClass("your_turn");
      $('#toolList_role1').addClass('your_turn');
      $('#toolList_role2').removeClass("your_turn");
      }
    
    $("button").removeClass('doWhat');//全部換白色按鍵
    canActive();//可再點卡
    endAction('',false);//重啟點卡按鍵
    role.toLearnSkill="";//將學習區變為0
    $('.weapon').removeClass('choose');//武器系統還原為空
    role.weaponChoose="";//武器系統選取還原為空
    role.weaponAttack=0;//武器系統值還原為空
    role.weaponChoose2="";//武器系統選取還原為空
    role.weaponAttack2=0;//武器系統值還原為空
    doWhat=1;//預設行動為攻擊
    $(".attack").addClass('doWhat');//預設行動為攻擊
    $('.canTrap').removeClass("canTrap");//避免有人按陷阱後不放
    $(".magicPower").removeClass("active magicPower")//換回合後，移除因魔法而可以翻的卡

}



//將卡牌卡置桌面上
function addOption(back){
    //$('.memory-game').afert('<div class="card" data-framework="react">');
    console.log(card_list);
    
    card_list.forEach(element => {
      //console.log(card_list.indexOf(element));
      //console.log(element); 
      var j=card_list.indexOf(element)+1;//計算該項目次序 
       
      element.order=j;//設定每張的位置

      let cardId=['boss1','boss2','boss3','boss4','boss5','boss6'];
      if (cardId.includes(element.id)){
        console.log("find");
        $('[data-framework="'+j+'"]').append('<img class="front-face" src="img/'+element.src+'"/>');
        $('[data-framework="'+j+'"]').append('<img class="back-face" src="img/backboss.png" alt="back"/>');// 動態新增卡牌
        return;
      };
    
     // $('[data-framework="'+j+'"]').append('<div class="attackValue"></div>');
      $('[data-framework="'+j+'"]').append('<img class="front-face" src="img/'+element.src+'"/>');
      
      $('[data-framework="'+j+'"]').append('<img class="back-face" src="img/'+back+'" alt="back"/>');// 動態新增卡牌
      
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

//點擊後就消失設定為USED
function setUsed(Fromthis){

  
  $(Fromthis).addClass("used");//點擊後消失
  setNextActive(Fromthis.dataset.framework);//設上一張卡為active
  
};

//設定最後一張為Active
function setActive(){
  $('[data-framework="21"]').addClass('active');
  $('[data-framework="22"]').addClass('active');
  $('[data-framework="23"]').addClass('active');
  $('[data-framework="24"]').addClass('active');
  $('[data-framework="25"]').addClass('active');


};

//無法再執行點擊行動
function notActive(){
  $('.active').addClass("unactive");
  $('.active').removeClass("active");
  };

 //可再執行行動
function canActive(){
  $('.unactive').addClass("active");
  $('.unactive').removeClass("unactive");
};

//設點擊完的上一張卡為active
function setNextActive(framework){
  let tem0='[data-framework='+String(framework-10)+']';//後後一排卡位置
  let tem='[data-framework='+String(framework-5)+']';//後一排卡位置
  let tem2='[data-framework='+String(framework+5)+']';//前一排卡位置
  
  //$(tem).addClass('flip active');
  //if(tem<0){return};//不能用break 會跳出整個ready函式
  
   if($(tem2).hasClass('used')==false||framework>20){//確保前一張是有使用過或在第一排
   $(tem).addClass('flip active');
   }
   if($(tem).hasClass('used')==true) {//如果上一張是使用過的，就開上上一張  
   $(tem0).addClass('flip active'); 
   }


};

//點擊執行場面上的卡效果
function getCard(framework){
  console.log(framework);
  let clickCard=card_list[framework-1]
  console.log(clickCard);
  clickCard.attackEvent();
}

//休息系統
function rest(){
  role.hp=role.hp+role.restUp;
  //console.log(clickCard);
  console.log(role.hp);
  doWhat=1;
};

//血祭系統
function sacrifice(){
  if(role.runeMasterMagic==true)//是否有血祭效果一半的魔法
  {role.hp=role.hp-(role.sacrificeNum*1);
  }else{role.hp=role.hp-(role.sacrificeNum*2)};
  
  role.sacrificeNum++;//血祭次數加一

};




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

//(實驗)//
//放入手牌
function creatOwnCard()
{
  $('#toolList_role1').append('<img class="tool" src="img/boss2.png"/>');
}


function resetCard (level){
  
  $(".card").removeClass('used');
  $(".card").removeClass('flip');
  $(".card").removeClass('unactive');
  $(".card").empty();//清空卡牌DIV的圖

  setActive();//初始化下五張為active

  //偶數牌及底五張設為flip
  for(i=0;i<=20;i=i+2){
    var tem='[data-framework="'+String(i)+'"]';
    if(tem<0){return};//不能用break 會跳出整個ready函式
    $(tem).addClass('flip');
  }
  $('[data-framework="21"]').addClass('flip');
  $('[data-framework="22"]').addClass('flip');
  $('[data-framework="23"]').addClass('flip');
  $('[data-framework="24"]').addClass('flip');
  $('[data-framework="25"]').addClass('flip');

  setTimeout('', 5000);//等待3秒，以確定卡片翻牌完成 


  card_list=[];//清空陣列
//依等級放入
  switch (level){
    case 1:
      card_list=card_list1;
      break;
    case 2:
      card_list=card_list2;
      break;

    case 3:
      card_list=card_list3;
      break;
  }

  shuffle(card_list,24);//陣列，數量洗牌

  addOption("back"+level+".png");//戴入卡片
};

//確定卡牌還沒翻完或到最後一回合
function turnControl(){
  if($('.card.used').length==25&&level!=3){
    level++;
    resetCard(level);
  };
}
//使手牌全開
function f(){
$(".card").addClass("flip");
}
// 下陷阱
function setTrap (framework,trapAttack_origin){
  $('[data-framework='+framework+']').append('<img class="trap1" src="img/t1_4.png" alt="React" />');
  $('[data-framework='+framework+']').append('<img class="trap2" src="img/t1_4.png" alt="React" />');//使兩面都有圖案
  //使該卡片加入陷阱傷害
  var clickCard=card_list[framework-1];
  clickCard.trap.trapOwner=role.id;
  clickCard.trap.trapAttack=trapAttack_origin;//設定該卡的自帶陷阱傷害

}

//觸發的武器破壞陷阱
function setWeaponDestroy(weaponAttack){
           
            
  //    if(this.trap.trapOwner!=role){
          let weaponType=weaponAttack;//抓取該卡的破壞效果
          //誰的武器庫
          //console.log(weaponType);
          if(weaponAttack==""){return;}//不帶陷阱就退出
          //console.log(whosweaponType);
          let num=$('#toolList_'+role.id+' .'+weaponType).length;
          if (num==0){
              $(".tool").removeClass("canNotUsed" );// 移除黑白
              return;  };//如果完全沒有武器就反回 
          
          //打開role 的toolbar
          $('#toolButton').hide();//隱藏div 
          
          $("#toolBar").show();
          $("#toolList_role1 .tool,#toolList_role2 .tool").addClass("canNotUsed" );

          //判斷哪種武器要被銷毀
          
          switch(weaponType){// 將要改變的取消黑白
          //switch("gunbreak"){// 將要改變的取消黑白
              case "arrow":
                  $(".arrow").removeClass("canNotUsed" );
                  $(".arrow").addClass("canDestroy" );
                  break;
              case "gun":
                  $(".gun").removeClass("canNotUsed" );
                  $(".gun").addClass("canDestroy" );
                  break;
              case "sword":
                  $(".sword").removeClass("canNotUsed" );
                  $(".sword").addClass("canDestroy" );
                  break;
          }
                             
          //顯示可棄的武器//點擊後消失武器及toolbar          
          $('.canDestroy').one("click",function(){
              this.remove();
              role.weapon--;//持有武器數少1
              $(".tool").removeClass("canNotUsed" );// 移除黑白
              $(".tool").removeClass("canDestroy" );// 移除黑白
              $('#toolButton').show();//SHOW div 
              $("#toolBar").hide();
          })
      // }
            
      
  }
  //以下計數朋友傷害
  function followerCount(){

      
      let arrow=0;
      let gun=0;
      let sword=0;

      for (var item of role.handFriend){//總計朋友武器值計數器
          arrow=arrow+item.friend_arrow;
          gun=gun+item.friend_gun;
          sword=sword+item.friend_sword;
                
          console.log("arrow"+item.friend_arrow);
          console.log("gun"+item.friend_gun);
          console.log("sword"+item.friend_sword);
        
      }
      role.friend_arrow=arrow;
      role.friend_gun=gun;
      role.friend_sword=sword;                  
}