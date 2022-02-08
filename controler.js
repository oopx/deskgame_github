$(document).ready(function(){
     //初始化
     //初始化

        role=role2; 
        //creatMonsterCard(24);
        //創立牌組
        //creatBossCard1();//創立boss卡
        creatMonsterCard1();
        creatParnerCard1();
        creatWeaponCard1();
        creatTrapCard1();
        creatTreatCard1();

        

        //creatBossCard2();//創立boss卡
        creatMonsterCard2();
        creatParnerCard2();
        creatWeaponCard2();
        creatTrapCard2();
        creatTreatCard2();
      
        //creatBossCard3();//創立boss卡
        creatMonsterCard3();
        //creatParnerCard3();
        creatWeaponCard3();
        creatTrapCard3();
        creatTreatCard3();

        

        creatBossCard()//加入魔王卡

        console.log(card_list1);
        console.log(card_list2);
        console.log(card_list3);
        $("#endBoard").hide();//將完結隱藏
      
        //shuffle(card_list,24);//陣列，數量洗牌
        othersTurn();//換人
        resetCard(level);//設置該回合卡片
        //setActive();//初始化下五張為active
        //weaponChooseSys();//武器監聽系統
      
        doWhat=1;//預設行動為攻擊
        $(".attack").addClass('doWhat');//預設行動為攻擊
      
      
      
        
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
      
      //確定當前點卡是要做什麼 1為打怪，2為休息，3為移除，4學習，5血祭
        $(".attack").on("click",function(){
            doWhat=1;
            $("button").removeClass('doWhat');
            $(this).addClass('doWhat')
        })
        $(".rest").on("click",function(){
            doWhat=2;
            $("button").removeClass('doWhat');
            $(this).addClass('doWhat')
        })
        $(".remove").on("click",function(){
            doWhat=3;
            $("button").removeClass('doWhat');
            $(this).addClass('doWhat')
        })
        $(".learn").on("click",function(){
            doWhat=4;
            $("button").removeClass('doWhat');
            $(this).addClass('doWhat')
        })
        $(".sacrifice").on("click",function(){
            doWhat=5;
            $("button").removeClass('doWhat');
            $(this).addClass('doWhat')
            //$('img').attr('style','filter:grayscale(1)  hue-rotate(100deg)');//實驗，點後會有不同色調
            canActive();//可再執行行動，因為可一直血祭
        })  
      
      //執行點卡後的行動
        $("section").on ("click",".active",function(){
          console.log(this);
          
          let cardID=card_list[this.dataset.framework-1].id;
          
          switch(doWhat){//確定當前要做什麼 1為打怪，2為休息，3為移除，4學習，5血祭
              case 1:        
                  getCard(this.dataset.framework);//發動點擊該卡的效果
                  endAction(this,'disabled')//無法再進行任何行動
                  $('.attack').removeClass('doWhat');
                  break;
              case 2:
                  if (cardID=="boss1"||cardID=="boss2"||cardID=="boss3"||cardID=="boss4"||cardID=="boss5"||cardID=="boss6")
                  {return;}//如果是魔王就無法執行
                  rest();
                  $('.rest').removeClass('doWhat');
                  endAction(this,'disabled')//無法再進行任何行動
                  break;
              case 3: 
                  
                  $('.remove').removeClass('doWhat');
                  endAction(this,'disabled')//無法再進行任何行動
                  break;
              case 4:
                  if (cardID=="boss1"||cardID=="boss2"||cardID=="boss3"||cardID=="boss4"||cardID=="boss5"||cardID=="boss6")
                  {return;}//如果是魔王就無法執行
                  $('.learn').removeClass('doWhat');
                  endAction(this,'disabled')//無法再進行任何行動
                  break;
              case 5:
                  if (cardID=="boss1"||cardID=="boss2"||cardID=="boss3"||cardID=="boss4"||cardID=="boss5"||cardID=="boss6")
                  {return;}//如果是魔王就無法執行                  
                  sacrifice();
                  setUsed(this);
                  endAction('',false);//血祭後可重啟點卡按鍵
                 // $('.sacrifice').removeClass('doWhat'); 血祭不能關紅燈
                  break;
          }
          
        //確定卡牌還沒翻完或到最後一回合    
          if($('.card.used').length==25&&level!=3){
            level++;
            resetCard(level);
          }
        //每點完一張卡，即偵測是否可得魔法
        elementControl();
        //每點完一張卡，即偵測是否死亡
        if(role1.hp<=0 || role2.hp<=0 || Math.abs(role1.exp-role2.exp)>=4 )
        {   $("#endBoard").show();
            //alert("s");
            
        }

        });

    $(document).keyup(function(event){ if(event.keyCode==9){ $("#toolBar").toggle(); }});
    $("#toolBar").hide();//預設收合  
    $("#toolButton").on("click",function(event){
        let check=$(this).is('.click');
        $("#toolBar").show();
        if(check==true)$(this).removeClass("click");
        if(check==false)$(this).addClass("click");
        event.stopPropagation();

        $("#toolBar").one("click",function(){
            console.log("this bar");
            $("#toolBar").hide();
            $("#toolButton").removeClass("click"); //點空白處可收合，實驗      
        })

    })
    
    //抓取toolBar的元件，並自動連結到擁有者的手牌能力，未完成
    $("#toolBar").on("click",".tool",function(){
        let framework=this.dataset.framework;
        console.log(framework);
        role.hand[framework].toolAbility(this);
    })

    //換回合
    $('.turn').click( function(){othersTurn();}); 
    $(document).keyup(function(event){ if(event.keyCode==32){ othersTurn(); }}); 

    function elementControl(){
        //元素效果偵測
        let toolBarOwner="#toolList_"+role.id;//決定要加給誰

        if(role.elementGet.fire==2){//練炎劍 武器+2
            role.weaponAttackBuff=role.weaponAttackBuff+2;
            $(toolBarOwner).append('<img class="tool" src="img/m7.png"/>');
            role.elementGet.fire=0;//元素歸零
            role.fire2=1;//得到火二階魔法
        };
        if(role.fire2==1&&role.elementGet.fire==1){
            $(toolBarOwner).append('<img class="tool" src="img/m107.png"/>');
            role.exp=role.exp+1;
            role.elementGet.fire=0;//元素歸零
        };


        if(role.elementGet.water==2){
            role.restUp=role.restUp+4;
            $(toolBarOwner).append('<img class="tool" src="img/m8.png"/>');
            role.elementGet.water=0;//元素歸零
            role.water2=1;//得到水二階魔法

        };
        if(role.water2==1&&role.elementGet.water==1){
            $(toolBarOwner).append('<img class="tool" src="img/m108.png"/>');
            role.exp=role.exp+1;
            role.elementGet.water=0;//元素歸零
        };
    
        if(role.elementGet.thunder==2){
            role.monsterBuff=role.monsterBuff-3;
            $(toolBarOwner).append('<img class="tool" src="img/m9.png"/>');
            role.elementGet.thunder=0;//元素歸零
            role.thunder2=1;//得到雷二階魔法
        };
        if(role.thunder2==1&&role.elementGet.thunder==1){
            $(toolBarOwner).append('<img class="tool" src="img/m109.png"/>');
            role.exp=role.exp+1;
            role.elementGet.fire=0;//元素歸零
        };
        if(role.elementGet.poison==2){
            other.monsterBuff=other.monsterBuff+3;
            $(toolBarOwner).append('<img class="tool" src="img/m10.png"/>');
            role.elementGet.poison=0;//元素歸零
            role.poison2=1;//得到毒二階魔法
        };
        if(role.poison2==1&&role.elementGet.poison==1){
            $(toolBarOwner).append('<img class="tool" src="img/m110.png"/>');
            role.exp=role.exp+1;
            role.elementGet.fire=0;//元素歸零
        }; 
        if(role.elementGet.light==2){
            role.exp=role.exp+2;
            $(toolBarOwner).append('<img class="tool" src="img/m11.png"/>');
            role.elementGet.light=0;//元素歸零
            role.light2=1;//得到光二階魔法
        };
        if(role.light2==1&&role.elementGet.light==1){
            $(toolBarOwner).append('<img class="tool" src="img/m111.png"/>');
            role.exp=role.exp+1;
            role.elementGet.fire=0;//元素歸零
        }

        if(role.elementGet.earth==2){
            //承受傷害一半，已加於怪的傷害判定上
            $(toolBarOwner).append('<img class="tool" src="img/m12.png"/>');
            role.elementGet.earth=0;//元素歸零
            role.earth2=1;//得到慣毒二階魔法
        };
        if(role.earth2==1&&role.elementGet.earth==1){
            $(toolBarOwner).append('<img class="tool" src="img/m112.png"/>');
            role.exp=role.exp+1;
            role.elementGet.earth=0;//元素歸零
        }
   

    }
    //role原型實驗區
    role1.__proto__.fire2=0;
    role1.__proto__.fire3=0;
    role1.__proto__.water2=0;
    role1.__proto__.water3=0;
    role1.__proto__.earth2=0;
    role1.__proto__.earth3=0;
    role1.__proto__.thunder2=0;
    role1.__proto__.thunder3=0;
    role1.__proto__.poison2=0;
    role1.__proto__.poison3=0;
    role1.__proto__.light2=0;
    role1.__proto__.light3=0;

    
    /////////////////////////////////////////實驗區
    
    //測試鈕實驗用
    $('#nextLevel').click(function(){ 
        level++;
        resetCard(level);
        
      })
    $("#f").click(function(){f()});
    
    $('#testbutton').click(function(){
        var get=$("section .active");//抓取為有Active 的卡
        console.log(get.length);
        for(let i=0;i<get.length;i++)
        {
            console.log(get[i].dataset.framework);
            let framework=get[i].dataset.framework;
            //使第二層的可以點擊
            let tem='[data-framework='+String(framework-5)+']';//往上抓取一張
            
            if($(tem).hasClass("flip")){$(tem).addClass("active magicPower")};//如果該卡有被翻卡，即設為active
            
        }
        // for (var prop in get) {
        //     console.log(prop);
        //   }
        //get.forEach(element => console.log(element));
    });

})
{role.hp=100000;}


//插入選職業系統
skill_src=[];
for(let i=1;i<=14;i++){
$('#chooseSkill').append('<img class="skill" src="img/j'+i+'.png"/>');
}
//
 var list2=["ttee","jlk","sfasdf","sdasdf","sdas"];
 var tt="lkl"
 //console.log(card_list);
///建立職業卡
var viewControl= new Vue({
    el:'#chooseSkill',
    //delimiters: ['${', '}'],
    data:{
        img:tt,
        card_list:[],
        list: [
            { id: '123456789', name: '選項 1' },
            { id: '234567890', name: '選項 2' },
            { id: '345678901', name: '選項 3' },
          ],
    }

})

// //武器選擇系統
// function weaponChooseSys(){
//     $(".weaponBar .gun").on("click",function(){
//       $('.weaponBar .weapon').removeClass('choose');
//       $(this).addClass('choose');
//       role.weaponChoose="gun";
      
      
//     });
//     $(".weaponBar .arrow").on("click",function(){
//       $('.weaponBar .weapon').removeClass('choose');
//       $(this).addClass('choose');
//       role.weaponChoose="arrow";
      
//     })
//     $(".weaponBar .sword").on("click",function(){
//       $('.weaponBar weapon').removeClass('choose');
//       $(this).addClass('choose');
//       role.weaponChoose="sword";
      
//     })
//   }
    
    
    
    



