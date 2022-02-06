$(document).ready(function(){
     //初始化
     //初始化

        role=role2; 
        //creatMonsterCard(24);//創立牌組
        
        creatBossCard1();//創立boss卡
        creatMonsterCard1();
        creatParnerCard1();
        creatWeaponCard1();
        creatTrapCard1();
        creatTreatCard1();

        creatBossCard2();//創立boss卡
        creatMonsterCard2();
        creatParnerCard2();
        creatWeaponCard2();
        creatTrapCard2();
        creatTreatCard2();

        console.log(card_list);
        console.log(card_list2);
      
        //shuffle(card_list,24);//陣列，數量洗牌
        othersTurn();//換人
        resetCard(level);//設置該回合卡片
        setActive();//初始化下五張為active
        weaponChooseSys();//武器監聽系統
      
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
          switch(doWhat){//確定當前要做什麼 1為打怪，2為休息，3為移除，4學習，5血祭
              case 1:        
                  getCard(this.dataset.framework);//發動點擊該卡的效果
                  endAction(this,'disabled')//無法再進行任何行動
                  $('.attack').removeClass('doWhat');
                  break;
              case 2:
                  rest();
                  $('.rest').removeClass('doWhat');
                  endAction(this,'disabled')//無法再進行任何行動
                  break;
              case 3: 
                  
                  $('.remove').removeClass('doWhat');
                  endAction(this,'disabled')//無法再進行任何行動
                  break;
              case 4:
                  
                  $('.learn').removeClass('doWhat');
                  endAction(this,'disabled')//無法再進行任何行動
                  break;
              case 5:
                  
                  sacrifice();
                  setUsed(this);
                  endAction('',false);//血祭後可重啟點卡按鍵
                 // $('.sacrifice').removeClass('doWhat'); 血祭不能關紅燈
                  break;
          }
        });

    
    $("#toolBar").hide();//預設收合  
    $("#toolButton").on("click",function(event){
        let check=$(this).is('.click');
        $("#toolBar").show();
        if(check==true)$(this).removeClass("click");
        if(check==false)$(this).addClass("click");
        event.stopPropagation();

        $("div").one("click",function(){
            $("#toolBar").hide();
            $("#toolButton").removeClass("click"); //點空白處可收合，實驗      
        })

    })
    
    //抓取toolBar的元件，並自動連結到擁有者的手牌能力，未完成
    $("#toolBar").on("click",".tool",function(){
        let framework=this.dataset.framework;
        role.hand[framework].toolAbility(this);
    })

    //換回合
    $('.turn').click( function(){othersTurn();});

    //測試鈕實驗用
    $('#nextLevel').click(function(){ 
        level++;
        resetCard(level);
        
      })
    $("#f").click(function(){f()});
    $('#testbutton').click(function(){
           
            
    //    if(this.trap.trapOwner!=role){
            let weaponType=this.trap.weaponAttack;//抓取該卡的破壞𡋟果
            let num=$('#toolBar .'+weaponType).length;
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
                $(".tool").removeClass("canNotUsed" );// 移除黑白
                $(".tool").removeClass("canDestroy" );// 移除黑白
                $('#toolButton').show();//SHOW div 
                $("#toolBar").hide();
            })
        // }
              
        
    })

})

    // function setStart(){  
    //     role=role2; 
    //     //creatMonsterCard(24);//創立牌組
        
    //     creatBossCard1();//創立boss卡
    //     creatMonsterCard1();
    //     creatParnerCard1();
    //     creatWeaponCard1();
    //     creatTrapCard1();
    //     creatTreatCard1();
      
    //     shuffle(card_list,24);//陣列，數量洗牌
    //     othersTurn();//換人
    //     addOption('back1.png');//戴入卡片
    //     setActive();//初始化下五張為active
    //     weaponChooseSys();//武器監聽系統
      
    //     doWhat=1;//預設行動為攻擊
    //     $(".attack").addClass('doWhat');//預設行動為攻擊
      
      
      
        
    //   //偶數牌及底五張設為flip
    //     for(i=0;i<=20;i=i+2){
    //       var tem='[data-framework='+String(i)+']';
    //       if(tem<0){return};//不能用break 會跳出整個ready函式
    //       $(tem).addClass('flip');
    //     }
    //     $('[data-framework=21]').addClass('flip');
    //     $('[data-framework=22]').addClass('flip');
    //     $('[data-framework=23]').addClass('flip');
    //     $('[data-framework=24]').addClass('flip');
    //     $('[data-framework=25]').addClass('flip');
      
    //   //確定當前點卡是要做什麼 1為打怪，2為休息，3為移除，4學習，5血祭
    //     $(".attack").on("click",function(){
    //         doWhat=1;
    //       $("button").removeClass('doWhat');
    //       $(this).addClass('doWhat')
    //     })
    //     $(".rest").on("click",function(){
    //         doWhat=2;
    //         $("button").removeClass('doWhat');
    //         $(this).addClass('doWhat')
    //     })
    //     $(".remove").on("click",function(){
    //         doWhat=3;
    //         $("button").removeClass('doWhat');
    //         $(this).addClass('doWhat')
    //     })
    //     $(".learn").on("click",function(){
    //         doWhat=4;
    //         $("button").removeClass('doWhat');
    //         $(this).addClass('doWhat')
    //     })
    //     $(".sacrifice").on("click",function(){
    //         doWhat=5;
    //         $("button").removeClass('doWhat');
    //         $(this).addClass('doWhat')
    //         //$('img').attr('style','filter:grayscale(1)  hue-rotate(100deg)');//實驗，點後會有不同色調
    //         canActive();//可再執行行動，因為可一直血祭
    //     })  
      
    //   //執行點卡後的行動
    //     $("section").on ("click",".active",function(){
          
    //       switch(doWhat){//確定當前要做什麼 1為打怪，2為休息，3為移除，4學習，5血祭
    //           case 1:                
    //               getCard(this.dataset.framework);//發動點擊該卡的效果
    //               endAction(this,'disabled')//無法再進行任何行動
    //               $('.attack').removeClass('doWhat');
    //               break;
    //           case 2:
    //               rest();
    //               $('.rest').removeClass('doWhat');
    //               endAction(this,'disabled')//無法再進行任何行動
    //               break;
    //           case 3: 
    //               {};
    //               $('.remove').removeClass('doWhat');
    //               endAction(this,'disabled')//無法再進行任何行動
    //               break;
    //           case 4:
    //               {};
    //               $('.learn').removeClass('doWhat');
    //               endAction(this,'disabled')//無法再進行任何行動
    //               break;
    //           case 5:
                  
    //               sacrifice();
    //               setUsed(this);
    //               endAction('',false);//血祭後可重啟點卡按鍵
    //              // $('.sacrifice').removeClass('doWhat'); 血祭不能關紅燈
    //               break;
    //       }
    //     });
      
    //   }


    //下陷阱監聽
    // $("#toolBar").on("click",".trapTool",function(){
    //     notActive();
    //     $('.card').addClass("canTrap");//可加陷阱的class
    //     $(this).remove();;//點完圖後，該圖移除        
    //     let framework=this.dataset.framework;
    //     role.hand[framework].setTrapAbility();//執行role的能力      
    //     })

    // $("section").on("click",'.canTrap',function(event){ 
    //     //console.log(this.dataset.framework);
    //     event.stopPropagation();//防冒泡(實驗)

    //     setTrap(this.dataset.framework,2);//取得該卡的位置，原始傷害2
        
        
    //     $(this).removeClass("canTrap");//每個圖只能加一次
    //     console.log(this);
    //     //$(this).off();// 移除On 避免之前開陷阱留下的事件
    //     //加上陷阱
        
    //     let tem=($(".rest").attr("disabled"));//陷阱後，若原本已無行動，便不再恢復
    //     if(tem!="disabled")
    //         {canActive();}
    //     $('.canTrap').removeClass("canTrap");//移除陷阱的class
    //     })

      
    //於點擊的卡上設陷阱卡
    // function setTrap (framework,trapAttack_origin){
    //     $('[data-framework='+framework+']').append('<img class="trap1" src="img/t1_4.png" alt="React" />');
    //     $('[data-framework='+framework+']').append('<img class="trap2" src="img/t1_4.png" alt="React" />');//使兩面都有圖案
    //     //使該卡片加入陷阱傷害
    //     var clickCard=card_list[framework-1];
    //     clickCard.trap.trapOwner=role.id;
    //     clickCard.trap.trapAttack=trapAttack_origin;//設定該卡的自帶陷阱傷害
    
//   }
  

    //清理牌面，重置
    
    


    // $('.buttonUnTrap').click(function(){
    //     canActive();
    //     $('.canTrap').removeClass("canTrap");//移除陷阱的class
    //     })
    
    // $("section").on("click",'.canTrap',function(){ 
    //     //console.log(this.dataset.framework);
    //     setTrap(this.dataset.framework,2);
    //     $(this).removeClass("canTrap");//每個圖只能加一次
    //     console.log(this);
    //     $(this).off();// 移除On 避免之前開陷阱留下的事件
    //     //加上陷阱
    //     })

    

    
    
    



