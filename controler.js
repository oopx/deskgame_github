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
            $("#toolButton").removeClass("click");
           
       
        })

    })
    

    //下陷阱

    $(".trapTool.tool").on("click",function(){
        notActive();
        $('.card').addClass("canTrap");//可加陷阱的class
        $(this).addClass("used");//點完圖後，該圖消失        
              
        })

    $("section").on("click",'.canTrap',function(){ 
        //console.log(this.dataset.framework);
        setTrap(this.dataset.framework,2);//取得該卡的位置，原始傷害2
        $(this).removeClass("canTrap");//每個圖只能加一次
        console.log(this);
        //$(this).off();// 移除On 避免之前開陷阱留下的事件
        //加上陷阱
        let tem=($(".rest").attr("disabled"));//陷阱後，若原本已無行動，便不再恢復
        if(tem!="disabled")
            {canActive();}
        $('.canTrap').removeClass("canTrap");//移除陷阱的class
        })

    
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

    

    $('.turn').click( function(){othersTurn();});//換回合

    
    
    
})


