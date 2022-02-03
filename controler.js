$(document).ready(function(){
    setStart();//初始化
    $("#toolBar").attr('style','display:none');//預設收合
    
    //tollCenter();//工具管理系統
    // $("div").on("click",function(){
    //     let check=$(this).is('.click');
    //     $("#toolBar").toggle(300);
    //     if(check==true)$(this).removeClass("click");
    //     if(check==false)$(this).addClass("click");
    // })
    $("#toolButton").on("click",function(event){
        let check=$(this).is('.click');
        $("#toolBar").toggle(300);
        if(check==true)$(this).removeClass("click");
        if(check==false)$(this).addClass("click");
        event.stopPropagation();
        $("div").one("click",function(){
            $("#toolBar").attr('style','display:none');
            $("#toolButton").removeClass("click"); //點空白處可收合，實驗      
        })

    })
    

    //下陷阱

    $("#toolBar").on("click",".tool",function(){
        notActive();
        $('.card').addClass("canTrap");//可加陷阱的class
        $(this).remove();;//點完圖後，該圖移除        
        let framework=this.dataset.framework;
        //$('[data-framework='+framework+']')
        role.hand[framework].setTrapAbility();//執行role的能力      
        })

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
    function setTrap (framework,trapAttack_origin){
        $('[data-framework='+framework+']').append('<img class="trap1" src="img/t1_4.png" alt="React" />');
        $('[data-framework='+framework+']').append('<img class="trap2" src="img/t1_4.png" alt="React" />');//使兩面都有圖案
        //使該卡片加入陷阱傷害
        var clickCard=card_list[framework-1];
        clickCard.trap.trapOwner=role.id;
        clickCard.trap.trapAttack=trapAttack_origin;//設定該卡的自帶陷阱傷害
    
  }
    //換回合

    $('.turn').click( function(){othersTurn();});

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

    

    
    
    
})


