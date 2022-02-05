// //初始化
// var role;
// var other;
// var level=1;
// var doWhat=1;//確定當前要做什麼 1為打怪，2為休息，3為移除，4學習，5血祭
// var card_list=[];//場面上的牌組
// var card_list1=[];
// var card_list2=[];
// var card_list3=[];
// function setStart(){  
//   role=role2; 
//   //creatMonsterCard(24);//創立牌組
  
//   creatBossCard1();//創立boss卡
//   creatMonsterCard1();
//   creatParnerCard1();
//   creatWeaponCard1();
//   creatTrapCard1();
//   creatTreatCard1();

//   shuffle(card_list,24);//陣列，數量洗牌
//   othersTurn();//換人
//   addOption('back1.png');//戴入卡片
//   setActive();//初始化下五張為active
//   weaponChooseSys();//武器監聽系統

//   doWhat=1;//預設行動為攻擊
//   $(".attack").addClass('doWhat');//預設行動為攻擊



  
// //偶數牌及底五張設為flip
//   for(i=0;i<=20;i=i+2){
//     var tem='[data-framework='+String(i)+']';
//     if(tem<0){return};//不能用break 會跳出整個ready函式
//     $(tem).addClass('flip');
//   }
//   $('[data-framework=21]').addClass('flip');
//   $('[data-framework=22]').addClass('flip');
//   $('[data-framework=23]').addClass('flip');
//   $('[data-framework=24]').addClass('flip');
//   $('[data-framework=25]').addClass('flip');

// //確定當前點卡是要做什麼 1為打怪，2為休息，3為移除，4學習，5血祭
//   $(".attack").on("click",function(){
//       doWhat=1;
//     $("button").removeClass('doWhat');
//     $(this).addClass('doWhat')
//   })
//   $(".rest").on("click",function(){
//       doWhat=2;
//       $("button").removeClass('doWhat');
//       $(this).addClass('doWhat')
//   })
//   $(".remove").on("click",function(){
//       doWhat=3;
//       $("button").removeClass('doWhat');
//       $(this).addClass('doWhat')
//   })
//   $(".learn").on("click",function(){
//       doWhat=4;
//       $("button").removeClass('doWhat');
//       $(this).addClass('doWhat')
//   })
//   $(".sacrifice").on("click",function(){
//       doWhat=5;
//       $("button").removeClass('doWhat');
//       $(this).addClass('doWhat')
//       //$('img').attr('style','filter:grayscale(1)  hue-rotate(100deg)');//實驗，點後會有不同色調
//       canActive();//可再執行行動，因為可一直血祭
//   })  

// //執行點卡後的行動
//   $("section").on ("click",".active",function(){
    
//     switch(doWhat){//確定當前要做什麼 1為打怪，2為休息，3為移除，4學習，5血祭
//         case 1:                
//             getCard(this.dataset.framework);//發動點擊該卡的效果
//             endAction(this,'disabled')//無法再進行任何行動
//             $('.attack').removeClass('doWhat');
//             break;
//         case 2:
//             rest();
//             $('.rest').removeClass('doWhat');
//             endAction(this,'disabled')//無法再進行任何行動
//             break;
//         case 3: 
//             {};
//             $('.remove').removeClass('doWhat');
//             endAction(this,'disabled')//無法再進行任何行動
//             break;
//         case 4:
//             {};
//             $('.learn').removeClass('doWhat');
//             endAction(this,'disabled')//無法再進行任何行動
//             break;
//         case 5:
            
//             sacrifice();
//             setUsed(this);
//             endAction('',false);//血祭後可重啟點卡按鍵
//            // $('.sacrifice').removeClass('doWhat'); 血祭不能關紅燈
//             break;
//     }
//   });

// } 
var role;
var other;
var level=1;
var doWhat=1;//確定當前要做什麼 1為打怪，2為休息，3為移除，4學習，5血祭
var card_list=[];//場面上的牌組
var card_list1=[];
var card_list2=[];
var card_list3=[];



//結束行動，使不可按行動，並變色
function endAction(fromThis,isAble){
    $(".remove,.rest,.learn,.attack").attr('disabled',isAble);//使按扭不能再次使用
        
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
    $("#role2").addClass("your_turn");
    $("#role1").removeClass("your_turn");
    $('#toolList_role2').addClass('your_turn');
    $("#toolList_role1").removeClass("your_turn");
    } 
    else{//換role1
    role=role1;
    other=role2;
    $("#role1").addClass("your_turn");
    $("#role2").removeClass("your_turn");
    $('#toolList_role1').addClass('your_turn');
    $('#toolList_role2').removeClass("your_turn");
    }
    
    $("button").removeClass('doWhat');//全部換白色按鍵
    canActive();//可再點卡
    endAction('',false);//重啟點卡按鍵
    $('.weapon').removeClass('choose');//武器系統還原為空
    role.weaponChoose="";//武器系統還原為空
    doWhat=1;//預設行動為攻擊
    $(".attack").addClass('doWhat');//預設行動為攻擊
    $('.canTrap').removeClass("canTrap");//避免有人按陷阱後不放

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
    
    
      $('[data-framework="'+j+'"]').append('<img class="front-face" src="img/'+element.src+'"alt="React"/>');
      
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
function setNextActive(framwork){
  var tem='[data-framework='+String(framwork-5)+']';
   if(tem<0){return};//不能用break 會跳出整個ready函式
   $(tem).addClass('flip active');

};

//點擊執行場面上的卡效果
function getCard(framework){
  console.log(framework);
  var clickCard=card_list[framework-1]
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
  role.hp=role.hp-(role.sacrificeNum*2);
  role.sacrificeNum++;//血祭次數加一

};

//武器選擇系統
function weaponChooseSys(){
  $(".weaponBar .gun").on("click",function(){
    $('.weaponBar .weapon').removeClass('choose');
    $(this).addClass('choose');
    role.weaponChoose="gun";
    
    
  });
  $(".weaponBar .arrow").on("click",function(){
    $('.weaponBar .weapon').removeClass('choose');
    $(this).addClass('choose');
    role.weaponChoose="arrow";
    
  })
  $(".weaponBar .sword").on("click",function(){
    $('.weaponBar weapon').removeClass('choose');
    $(this).addClass('choose');
    role.weaponChoose="sword";
    
  })
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

//(實驗)//
//放入手牌
function creatOwnCard()
{
  $('#toolList_role1').append('<img class="tool" src="img/boss2.png"/>');
}


function resetCard (level){
  $(".card").empty();//清空卡牌DIV
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

  shuffle(card_list,23);//陣列，數量洗牌

  addOption("back"+level+".png");//戴入卡片
};

// function creatMonsterCard2(num,level){
//   for(var i=0;i<num;i++)
//   {
//       var src="c"+level+"_"+String(i+1)+".png";
//       //console.log(src);
//       var tem=new CardMonster(i+1,src,2,0,1,0,1,0,0,0,0,0,0);
//       card_list.push(tem);
//   }
// }

function turnControl(){
  if($('.card.used').length==25){};
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