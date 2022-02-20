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
                  role.toLearnSkill.ability();//執行該卡的學習效果

                  if(role==role2){//將該卡加入可視技能區
                    $("#role2").append('<img id="'+role.toLearnSkill.id+'" class="skill" src="img/'+role.toLearnSkill.id+'.png" alt="'+role.toLearnSkill.id+'"/>');
                    }
                  if(role==role1){
                    $("#role1").append('<img id="'+role.toLearnSkill.id+'" class="skill" src="img/'+role.toLearnSkill.id+'.png" alt="'+role.toLearnSkill.id+'"/>');
                    }

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
        //改動血量魂值條
        $("#role1Hp").attr("value",role1.hp);
        $("#role1Exp").attr("style","width:"+String(role1.exp/25*100)+"%");
       // $("#role1Hp").append(role1.hp);
        $("#role2Hp").attr("value",role2.hp);
        $("#role2Exp").attr("style","width:"+String(role2.exp/25*100)+"%");
        //每點完一張卡，即偵測是否死亡
        if(role.isGuider==true&&role.magicOwn>=5){$("#endBoard").append("<hr>VICTOR</hr>");}
        if(role==role1){return;}//如果還沒完成該回合，則不結算
        if(role1.hp<=0 || role2.hp<=0 || Math.abs(role1.exp-role2.exp)>=4 )
        {   $("#endBoard").show();
            if(role1.hp<=0){
                $("#endBoard").append("<hr>Role2 VICTOR</hr>");
            }else if(role2.hp<=0){
                $("#endBoard").append("<hr>Role1 VICTOR</hr>");
            }else if(role1.exp>role2.exp){
                $("#endBoard").append("<hr>Role1 VICTOR</hr>");
            }else if(role2.exp>role1.exp){
                $("#endBoard").append("<hr>Role2 VICTOR</hr>");
            }else{return;}
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

    //元素效果偵測
    function elementControl(){
        //元素效果偵測
        let toolBarOwner="#toolList_"+role.id;//決定要加給誰

        if(role.elementGet.fire==2){//練炎劍 武器+2
            role.weaponAttackBuff=role.weaponAttackBuff+2;
            $(toolBarOwner).append('<img class="tool" src="img/m7.png"/>');
            role.elementGet.fire=0;//元素歸零
            role.fire2=1;//得到火二階魔法
            role.magicOwn++;
        };
        if(role.fire2==1&&role.elementGet.fire==1){
            $(toolBarOwner).append('<img class="tool" src="img/m107.png"/>');
            role.exp=role.exp+1;
            role.elementGet.fire=0;//元素歸零
            role.magicOwn++;
        };


        if(role.elementGet.water==2){
            role.restUp=role.restUp+4;
            $(toolBarOwner).append('<img class="tool" src="img/m8.png"/>');
            role.elementGet.water=0;//元素歸零
            role.water2=1;//得到水二階魔法
            role.magicOwn++;

        };
        if(role.water2==1&&role.elementGet.water==1){
            $(toolBarOwner).append('<img class="tool" src="img/m108.png"/>');
            role.exp=role.exp+1;
            role.elementGet.water=0;//元素歸零
            role.magicOwn++;
        };
    
        if(role.elementGet.thunder==2){
            role.monsterBuff=role.monsterBuff-3;
            $(toolBarOwner).append('<img class="tool" src="img/m9.png"/>');
            role.elementGet.thunder=0;//元素歸零
            role.thunder2=1;//得到雷二階魔法
            role.magicOwn++;
        };
        if(role.thunder2==1&&role.elementGet.thunder==1){
            $(toolBarOwner).append('<img class="tool" src="img/m109.png"/>');
            role.exp=role.exp+1;
            role.elementGet.fire=0;//元素歸零
            role.magicOwn++;
        };
        if(role.elementGet.poison==2){
            other.monsterBuff=other.monsterBuff+3;
            $(toolBarOwner).append('<img class="tool" src="img/m10.png"/>');
            role.elementGet.poison=0;//元素歸零
            role.poison2=1;//得到毒二階魔法
            role.magicOwn++;
        };
        if(role.poison2==1&&role.elementGet.poison==1){
            $(toolBarOwner).append('<img class="tool" src="img/m110.png"/>');
            role.exp=role.exp+1;
            role.elementGet.fire=0;//元素歸零
            role.magicOwn++;
        }; 
        if(role.elementGet.light==2){
            role.exp=role.exp+2;
            $(toolBarOwner).append('<img class="tool" src="img/m11.png"/>');
            role.elementGet.light=0;//元素歸零
            role.light2=1;//得到光二階魔法
            role.magicOwn++;
        };
        if(role.light2==1&&role.elementGet.light==1){
            $(toolBarOwner).append('<img class="tool" src="img/m111.png"/>');
            role.exp=role.exp+1;
            role.elementGet.fire=0;//元素歸零
            role.magicOwn++;
        }

        if(role.elementGet.earth==2){
            //承受傷害一半，已加於怪的傷害判定上
            $(toolBarOwner).append('<img class="tool" src="img/m12.png"/>');
            role.elementGet.earth=0;//元素歸零
            role.earth2=1;//得到慣毒二階魔法
            role.magicOwn++;
        };
        if(role.earth2==1&&role.elementGet.earth==1){
            $(toolBarOwner).append('<img class="tool" src="img/m112.png"/>');
            role.exp=role.exp+1;
            role.elementGet.earth=0;//元素歸零
            role.magicOwn++;
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
    
    role1.__proto__.runeMasterMagic=false;//是否有血祭效果一半的魔法

    
    /////////////////////////////////////////實驗區
    
    //測試鈕實驗用
    $('#nextLevel').click(function(){ 
        level++;
        resetCard(level);
        
      })
    $("#f").click(function(){f()});
    
    $('#testbutton').click(function(){
        
        //const index = array.indexOf(3);
        
        card_list = card_list.filter(function(item) {
            return item.id !== "c1_17";//可刪除特定物件
        });
        console.log(card_list)
    });

    
    $('#testbutton2').click(function(){
        $(".friend").addClass("canMusic");
        $("#toolBar").one("click",".canMusic",function(){
            console.log(this.id);
            let clickParner=role.hand.filter(word => word.id==this.id);
            console.log(clickParner);
            console.log(clickParner[0].type);
            switch(clickParner[0].type){
                case "gun":
                    clickParner[0].friend_gun=clickParner[0].friend_gun+2;
                    break; 
                case "sword":
                    clickParner[0].friend_sword=clickParner[0].friend_sword+2;
                    break;
                case "arrow":
                    clickParner[0].friend_arrow=clickParner[0].friend_arrow+2;
                    break;
            }
        $(".canMusic").removeClass("canMusic" );
            
           

            })  
    });
    $('#testbutton3').click(function(){   //總計朋友武器值計數器
        for (var item of role.handFriend){
            //var j=0;
            //i=i+item.friend_arrow;
            let arrow=item.friend_arrow;
            let gun=item.friend_gun;
            let sword=item.friend_sword;
            role.friend_arrow=arrow;
            role.friend_gun=gun;
            role.friend_sword=sword;

            console.log("arrow"+item.friend_arrow);
            console.log("gun"+item.friend_gun);
            console.log("sword"+item.friend_sword);
           
        }
    });
        //role.hp=10000;
        
        // const result = card_list.filter(word => word.type=="gun");//測試用，可篩選ID
        // console.log(result.length);
        
        //list2.splice(index, 1);//好用，可用於vue
    
    //可學習測試中
    $("#toolBar").on("click",".skill",function(){
        let tem=this.alt;
       let  result = skill_list.filter(word => word.id==tem);//找出的相對應物件
       console.log(result[0].ability);//可找到對應的Skill物件
       //console.log(String(this));
       
       tem=this;
       if(role.exp>=result[0].exp){
       //將學習行動點燈
        doWhat=4;
        $("button").removeClass('doWhat');
        $(".learn").addClass('doWhat')
        role.toLearnSkill=result[0]//將該卡附加於ROLE上
        
        //result[0].ability();//執行該職業卡的技能
        if($(".attack").hasClass("disabled")=="disabled"){return;}//若當下無學習行動，則返回
        this.remove();
        console.log(this.alt);
        }
       
    });
    
    //測試技能台  //插入選職業系統
    skill_src=[];
    for(let i=1;i<=14;i++){
        let tem='<img id="j'+String(i)+'" class="skill" src="img/j'+String(i)+'.png" alt="j'+String(i)+'"/>';
        skill_src.push(tem);    
    }
        
   

    //洗牌
    var tmp ;
    var poker=skill_src;
    var t = 0;
    for (var i = 1; i < poker.length; i++) {
        t = Math.floor((Math.random() * 13) + 1);
        tmp = poker[i];
        poker[i] = poker[t];
        poker[t] = tmp;
        //skill_src=poker;
    }    
    //排上桌
    for(let i=1;i<=7;i++){//只抽七張
        $('#chooseSkill').append(skill_src[i]);
        }

    var num=1;
    $(".skill").one('click',function(){
        if([1,4,5].includes(num)){role=role1};
        if([2,3,6].includes(num)){role=role2};
        
        console.log(this);

        role.handSkill.push(this);
        if(role==role1){
        $('#role1handSkill').append('<img id="'+this.alt+'" class="skill" src="img/'+this.alt+'.png" alt="'+this.alt+'"/>');
        $('#toolList_role1').append('<img id="'+this.alt+'" class="skill" src="img/'+this.alt+'.png" alt="'+this.alt+'"/>');
        }
        else if(role==role2){
        $('#role2handSkill').append('<img id="'+this.alt+'" class="skill" src="img/'+this.alt+'.png" alt="'+this.alt+'"/>');
        $('#toolList_role2').append('<img id="'+this.alt+'" class="skill" src="img/'+this.alt+'.png" alt="'+this.alt+'"/>');
        }

        this.remove();
        num++;
        if(num==7)
        {   $("#role1handSkill").clone
            
            $(".chooseSkill").remove();}
            role=role1;//回到角色一
        });


    //測試預顯傷害
    $("section").on ("mouseenter",".active",function(){
        let framework=this.dataset.framework;
        //console.log(framework);
        let clickCard=card_list[framework-1]
        //console.log(clickCard);
        let title=clickCard.attackValue();
        console.log(clickCard.attackValue());
        $(this).attr("title",title);
    })

    //測試滑鼠位置
    $("html").mousemove(function(e){
        console.log(e.pageX+", "+e.pageY);
        if(e.pageX==0){$("#role1").show()}
        else if(e.pageX>=$(window).width()){$("#role2").show()}
        else{$("#role1,#role2").hide();}
      })
})

//測試

skill_src=[];


$(".skill").on('click',function(){
console.log(this);
this.remove();
});

//測試
let num=$('#toolList_roll1 .gun').length;
$("#toolList_role1 .sword").length//計算手牌量
role.hand.filter(word => word.type=="sword");

//測試
 var list2=["c1_1","c1_2","c1_3","c1_4","c1_5"];
 var tt="lkl"
 //console.log(card_list);
///建立職業卡
var viewControl= new Vue({
    el:'#role2handSkill',
    //delimiters: ['${', '}'],
    data:{
        img:list2,
        card_list:[],
        img:["img/c1_1.png","img/c1_2.png","img/c1_3.png","img/c1_4.png","img/c1_5.png"],
        
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
    
    
    
    



