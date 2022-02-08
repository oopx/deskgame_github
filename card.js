//怪物卡片建構子

function CardMonster(id,src,gun_short,sword_short,arrow_short,attack,exp,fire,water,earth,thunder,poison,light){
    //this.__proto__.__proto__.testtt="test";//卡片的原型鍊//實驗中
    this.id=id;
    this.src=src;
    this.gun_short=gun_short;
    this.sword_short=sword_short;
    this.arrow_short=arrow_short;
    this.attack=attack;
    this.exp=exp;
    this.order=0;//卡牌在場上順序
    this.trap={trapOwner:role,trapAttack:0,weaponAttack:""};//陷阱物件 預設trap傷害為0
    this.element={
        fire:fire,
        water:water,
        earth:earth,
        thunder:thunder,
        poison:poison,
        light:light
    };
    
    //攻擊系統,靈魂系統
    this.attackEvent=function(){
        console.log(role.hp);
        //var card=this;
        //role.hp++;
        
        //武器判定
        switch(role.weaponChoose){
            case "gun":
                this.attack=ignoreNegative(this.attack-((role.weaponAttack+role.weaponAttackBuff)*this.gun_short));
                break;
            case "sword":
                this.attack=ignoreNegative(this.attack-((role.weaponAttack+role.weaponAttackBuff)*this.sword_short));
                break;
            case "arrow":
                this.attack=ignoreNegative(this.attack-((role.weaponAttack+role.weaponAttackBuff)*this.arrow_short));
                break;
            case "wraichWand":this.attack=ignoreNegative(this.attack-2-role.weaponAttackBuff);//針對真傷武器
                break;
            case "gun arrow sword"://針對三相武器
                {
                if(this.gun_short>this.sword_short&&this.gun_short>this.arrow_short)
                    this.attack=ignoreNegative(this.attack-((role.weaponAttack+role.weaponAttackBuff)*this.gun_short));
                else if(this.sword_short>this.gun_short&&this.sword_short>this.arrow_short)                
                    this.attack=ignoreNegative(this.attack-((role.weaponAttack+role.weaponAttackBuff)*this.sword_short));
                else if(this.arrow_short>this.gun_short&&this.arrow_short>this.sword_short) 
                    this.attack=ignoreNegative(this.attack-((role.weaponAttack+role.weaponAttackBuff)*this.arrow_short));
                else {alert("wrong");};
                break;
                }
            default: {
                break;
                }
        }
        //陷阱傷害計算
        if(this.trap.trapOwner!=role.id){role.hp=role.hp-role.more_trapAttack-this.trap.trapAttack}//若卡上有非自己的陷阱，將發動傷害效果
        if(this.trap.trapOwner!=role.id){setWeaponDestroy(this.trap.weaponAttack);}//若卡上有非自己的陷阱，將發動傷害效果
        //攻擊血量計算
        this.attack=ignoreNegative(this.attack+role.monsterBuff);//來自自身的增減傷
        if(role.earth2==1){//有兩個土元素的話
            role.hp=role.hp-0.5*(ignoreNegative(this.attack-gun_short*role.friend_gun-this.sword_short*role.friend_sword-this.arrow_short*role.friend_arrow));

        }else{
            
            role.hp=role.hp-ignoreNegative(this.attack-gun_short*role.friend_gun-this.sword_short*role.friend_sword-this.arrow_short*role.friend_arrow);
        }
        //經驗值計算
        role.exp=role.exp+this.exp;
        //元素量計算
        role.elementGet.fire=role.elementGet.fire+this.element.fire;
        role.elementGet.water=role.elementGet.water+this.element.water;
        role.elementGet.earth=role.elementGet.earth+this.element.earth;
        role.elementGet.thunder=role.elementGet.thunder+this.element.thunder;
        role.elementGet.poison=role.elementGet.poison+this.element.poison;
        role.elementGet.light=role.elementGet.light+this.element.light;
       
                    
    };
    

}


//夥伴卡片建構子
function CreatParnerCard(id,src,friend_gun,friend_sword,friend_arrow){
    this.id=id;
    this.src=src;
    this.friend_gun=friend_gun;
    this.friend_sword=friend_sword;
    this.friend_arrow=friend_arrow;
    this.order=0;
    this.trap={trapOwner:role,trapAttack:0,weaponAttack:""};
    this.attackEvent=function(){//點擊後執行
        role.friend_gun=role.friend_gun+this.friend_gun;
        role.friend_sword=role.friend_sword+this.friend_sword;
        role.friend_arrow=role.friend_arrow+this.friend_arrow;
        if(friend_free==false){role.hp=role.hp-role.friendNum;}//號召夥伴花的血量，如果沒有friend_free魔法的話
        role.friendNum++;//號召朋友的次數
        //加入手牌
        if(role==role1)
            {$('#toolList_role1').append('<img class="tool" src="img/'+this.src+'"/>');}
        if(role==role2)
            {$('#toolList_role2').append('<img class="tool" src="img/'+this.src+'"/>');}
        //陷阱傷害計算
        if(this.trap.trapOwner!=role.id){role.hp=role.hp-role.more_trapAttack-this.trap.trapAttack};
        if(this.trap.trapOwner!=role.id){setWeaponDestroy(this.trap.weaponAttack);}//若卡上有非自己的陷阱，將發動傷害效果


        
    }
}
//武器卡片建構子
function CreatWeaponCard(id,src,gun,sword,arrow,type){
    this.id=id;
    this.src=src;
    this.gun=gun,
    this.sword=sword,
    this.arrow=arrow,
    this.order=0,
    this.toolAbility=function(){};//放入toolBar的時候可執行的能力
    this.trap={trapOwner:role,trapAttack:0,weaponAttack:""};
    this.toolAbility=function(){
        console.log(type);
        role.weaponChoose=type;
        switch(type){
            case "gun":
                role.weaponAttack=this.gun;
                break;
            case "sword":
                role.weaponAttack=this.sword;
                break;
            case "arrow":
                role.weaponAttack=this.arrow;
                break;
            case "wraichWand"://其已自帶HP-2
                break;
            case "gun arrow sword"://
                role.weaponAttack=1;
                break;
        }

    
    };
    this.attackEvent=function(){//點擊後執行
        //加入手牌
       
        if(role==role1){
            role1.hand.push(this);
            let frame=role1.hand.indexOf(this);
            $('#toolList_role1').append('<img class="tool '+type+'" src="img/'+this.src+'"data-framework="'+frame+'"/>');}
        if(role==role2){
            role2.hand.push(this);
            let frame=role2.hand.indexOf(this);
            $('#toolList_role2').append('<img class="tool '+type+'" src="img/'+this.src+'"data-framework="'+frame+'"/>');}
        
        // if(this.gun>role.gun){role.gun=this.gun};
        // if(this.sword>role.sword){role.sword=this.sword};
        // if(this.arrow>role.arrow){role.arrow=this.arrow};       //換上最強的武器
        //陷阱傷害計算
        if(this.trap.trapOwner!=role.id){role.hp=role.hp-role.more_trapAttack-this.trap.trapAttack};
        if(this.trap.trapOwner!=role.id){setWeaponDestroy(this.trap.weaponAttack);}//若卡上有非自己的陷阱，將發動傷害效果
    }
}
//陷阱卡建構子
function CreatTrapCard(id,src,attack,isTrap,trapAttack_origin){
    this.id=id;
    this.src=src;
    this.attack=attack;
    this.order=0;
    this.trapAttack_origin=trapAttack_origin;
    this.trap={trapOwner:role,trapAttack:0,weaponAttack:""};

    //放入toolBar的時候，被點擊可執行的能力
    this.toolAbility=function(thisIcon){ 
        notActive();
        $('.card').addClass("canTrap");//可加陷阱的class
        $(thisIcon).remove();;//點完圖後，該圖移除        
       // let framework=thisIcon.dataset.framework;
       // role.hand[framework].setTrapAbility();//執行role的能力  
        
        $("section").one("click",'.canTrap',function(event){ 
            console.log(this);
            event.stopPropagation();//防冒泡(實驗) 

        //於點擊的卡上設陷阱卡
        $('[data-framework='+this.dataset.framework+']').append('<img class="trap1" src="img/t1_4.png" alt="React" />');
        $('[data-framework='+this.dataset.framework+']').append('<img class="trap2" src="img/t1_4.png" alt="React" />');//使兩面都有圖案
        //使該卡片加入陷阱傷害
        var clickCard=card_list[this.dataset.framework-1];
        clickCard.trap.trapOwner=role.id;
        console.log(this.dataset.framework);
        clickCard.trap.trapAttack=role.hand[thisIcon.dataset.framework].trapAttack_origin;//設定該卡的自帶陷阱傷害
    
            
        $(this).removeClass("canTrap");//每個圖只能加一次
        console.log(this);
        //$(this).off();// 移除On 避免之前開陷阱留下的事件
        //加上陷阱
        
        let tem=($(".rest").attr("disabled"));//陷阱後，若原本已無行動，便不再恢復
        if(tem!="disabled")
            {canActive();}
        $('.canTrap').removeClass("canTrap");//移除陷阱的class
        })
        
        
      
    };
    
    
    //this.handFrame="";//陷阱於手億的位置
    this.attackEvent=function(){
        other.hp=other.hp-this.attack;
        if(isTrap==0)return;//若該陷阱卡無帶可設陷阱
        
        if(role==role1)
            {//一次加兩張
            role1.hand.push(this);//加入手牌
            role1.hand.push(this);//加入手牌
            let frame=role1.hand.indexOf(this);
            
            $('#toolList_role1').append('<img class="trapTool tool" data-framework="'+frame+'" tool" src="img/t0_4.png"/>');
            $('#toolList_role1').append('<img class="trapTool tool " data-framework="'+(frame+1)+'" tool" src="img/t0_4.png"/>');           
            }
        if(role==role2)
            {
            role2.hand.push(this);//加入手牌, 一次兩張
            role2.hand.push(this);//加入手牌
            let frame=role2.hand.indexOf(this);

            $('#toolList_role2').append('<img class="trapTool tool" data-framework="'+frame+'" tool" src="img/t0_4.png"/>');
            $('#toolList_role2').append('<img class="trapTool tool" data-framework="'+(frame+1)+'" tool" src="img/t0_4.png"/>');

            }   
            
        //陷阱傷害計算
        if(this.trap.trapOwner!=role.id){role.hp=role.hp-role.more_trapAttack-this.trap.trapAttack};
        if(this.trap.trapOwner!=role.id){setWeaponDestroy(this.trap.weaponAttack);}//若卡上有非自己的陷阱，將發動傷害效果

    }
}
//武器破壞者建構子
function CreatWeaponDestroyer(id,src){
    this.id=id;
    this.src=src;
    this.order=0;
    this.trap={trapOwner:role,trapAttack:0,weaponAttack:""};
    //陷阱傷害計算
    if(this.trap.trapOwner!=role.id){role.hp=role.hp-role.more_trapAttack-this.trap.trapAttack};
    if(this.trap.trapOwner!=role.id){setWeaponDestroy(this.trap.weaponAttack);}//若卡上有非自己的陷阱，將發動傷害效果

    //放入toolBar的時候，被點擊可執行的能力
    this.toolAbility=function(thisIcon){ 
        notActive();
        $('.card').addClass("canTrap");//可加陷阱的class
        $(thisIcon).remove();//點完圖後，該圖移除        
        //console.log($(thisIcon)[0].alt);
        
        $("section").one("click",'.canTrap',function(event){ 
        event.stopPropagation();//防冒泡(實驗) 

        
        let chooseTrap=$(thisIcon)[0].alt;
        if(chooseTrap=="arrowbreak"){
                //於點擊的卡上設陷阱卡
            $('[data-framework='+this.dataset.framework+']').append('<img class="trap1" src="img/t1_1.png" alt="React" />');
            $('[data-framework='+this.dataset.framework+']').append('<img class="trap2" src="img/t1_1.png" alt="React" />');//使兩面都有圖案

            //使該卡片加入陷阱傷害
            var clickCard=card_list[this.dataset.framework-1];
            clickCard.trap.trapOwner=role.id;
            clickCard.trap.weaponAttack="arrow";//設定該卡破壞的武器種類          
            
            $(this).removeClass("canTrap");//每個圖只能加一次
            console.log(this);       
            
            let tem=($(".rest").attr("disabled"));//陷阱後，若原本已無行動，便不再恢復
            if(tem!="disabled")
                {canActive();}
            $('.canTrap').removeClass("canTrap");//移除陷阱的class  

        }
        if(chooseTrap=="gunbreak"){
                //於點擊的卡上設陷阱卡
            $('[data-framework='+this.dataset.framework+']').append('<img class="trap1" src="img/t1_2.png" alt="React" />');
            $('[data-framework='+this.dataset.framework+']').append('<img class="trap2" src="img/t1_2.png" alt="React" />');//使兩面都有圖案
            //使該卡片加入陷阱傷害
            var clickCard=card_list[this.dataset.framework-1];
            clickCard.trap.trapOwner=role.id;
            clickCard.trap.weaponAttack="gun";//設定該卡破壞的武器種類

            $(this).removeClass("canTrap");//每個圖只能加一次
            console.log(this);       
            let tem=($(".rest").attr("disabled"));//陷阱後，若原本已無行動，便不再恢復
            if(tem!="disabled")
                {canActive();}
            $('.canTrap').removeClass("canTrap");//移除陷阱的class
        }
        if(chooseTrap=="swordbreak"){
                //於點擊的卡上設陷阱卡
            $('[data-framework='+this.dataset.framework+']').append('<img class="trap1" src="img/t1_3.png" alt="React" />');
            $('[data-framework='+this.dataset.framework+']').append('<img class="trap2" src="img/t1_3.png" alt="React" />');//使兩面都有圖案
            //使該卡片加入陷阱傷害
            var clickCard=card_list[this.dataset.framework-1];
            clickCard.trap.trapOwner=role.id;
            clickCard.trap.weaponAttack="sword";//設定該卡破壞的武器種類       

            $(this).removeClass("canTrap");//每個圖只能加一次
            console.log(this);       
            let tem=($(".rest").attr("disabled"));//陷阱後，若原本已無行動，便不再恢復
            if(tem!="disabled")
                {canActive();}
            $('.canTrap').removeClass("canTrap");//移除陷阱的class
        }
        
        })
        
        
      
    
    };
   
    
    //this.handFrame="";//陷阱於手億的位置
    this.attackEvent=function(){
        if(role==role1)
            {//一次加三張
            role1.hand.push(this);//加入手牌
            role1.hand.push(this);//加入手牌
            role1.hand.push(this);//加入手牌
            let frame=role1.hand.indexOf(this);
            
            $('#toolList_role1').append('<img class="trapTool tool" data-framework="'+frame+'" tool" src="img/t1_1.png" alt="arrowbreak" />');
            $('#toolList_role1').append('<img class="trapTool tool " data-framework="'+(frame+1)+'" tool" src="img/t1_2.png" alt="gunbreak" />');           
            $('#toolList_role1').append('<img class="trapTool tool " data-framework="'+(frame+2)+'" tool" src="img/t1_3.png" alt="swordbreak" />'); 
            }
        if(role==role2)
            {
            role2.hand.push(this);//加入手牌, 一次3張
            role2.hand.push(this);//加入手牌
            role2.hand.push(this);//加入手牌
            let frame=role2.hand.indexOf(this);

            $('#toolList_role2').append('<img class="trapTool tool" data-framework="'+frame+'" tool" src="img/t1_1.png" alt="arrowbreak" />');
            $('#toolList_role2').append('<img class="trapTool tool " data-framework="'+(frame+1)+'" tool" src="img/t1_2.png" alt="gunbreak" />');           
            $('#toolList_role2').append('<img class="trapTool tool " data-framework="'+(frame+2)+'" tool" src="img/t1_3.png" alt="swordbreak" />');
            } 
            
        //陷阱傷害計算
        if(this.trap.trapOwner!=role.id){role.hp=role.hp-role.more_trapAttack-this.trap.trapAttack};

    }
}
//建立治療卡
function CreatTreatCard(id,src,treat,restUp){
    this.id=id;
    this.src=src;
    this.treat=treat;
    this.restUp=restUp;
    this.order=0;
    this.trap={trapOwner:role,trapAttack:0,weaponAttack:""};
    this.attackEvent=function(){
        role.restUp=role.restUp+this.restUp;
        role.hp=role.hp+this.treat;
        //陷阱傷害計算
        if(this.trap.trapOwner!=role.id){role.hp=role.hp-role.more_trapAttack-this.trap.trapAttack};
        if(this.trap.trapOwner!=role.id){setWeaponDestroy(this.trap.weaponAttack);}//若卡上有非自己的陷阱，將發動傷害效果

    
    }
}

//創立 VUE 物件
var role1= new Vue({
    el: '#role1 ',
    data:{
        id:'role1',
        hp:8,
        exp:0,
        //attack:0;
        gun:0,
        sword:0,
        arrow:0,
        num:3,
        restUp:3,
        soul:0,
        
        monsterBuff:0,//來自怪的傷害增加或減少，容許負值
        friend_gun:0,
        friend_sword:0,
        friend_arrow:0,
        elementGet:{
            fire:0,
            water:0,
            earth:0,
            thunder:0,
            poison:0,
            light:0
        },
        
        //more_attack:0,//來自怪的傷害增加或減少，容許負值
        more_trapAttack:0,//受到陷阱傷害增加
        friend_free:false,//招伙伴免費
        magicOwn:0,//擁有魔法數
        weapon:0,//擁有武器數
        sacrificeNum:1,//血祭次數
        friendNum:1,//召朋友次數

        weaponChoose:"",//當前使用武器
        weaponAttack:0,
        weaponAttackBuff:0,

        hand:[]//手牌
        },
    methods: {
        rest:function rest(){},
        sacrifice:function sacrifice(){},
        }   
    
})
//創立 VUE 角色物件
var role2= new Vue({
    el: '#role2 ',
    data:{
        id:'role2',
        hp:10,
        exp:0,
        //attack:0;
        gun:0,
        sword:0,
        arrow:0,
        num:3,
        restUp:3,
        soul:0,
        friend_gun:0,
        friend_sword:0,
        friend_arrow:0,
        
        monsterBuff:0,
        elementGet:{
            fire:0,
            water:0,
            earth:0,
            thunder:0,
            poison:0,
            light:0
        },
        //more_attack:0,//來自怪的傷害增加或減少，容許負值
        more_trapAttack:0,//受到陷阱傷害增加
        friend_free:false,//招伙伴免費
        magicOwn:0,//擁有魔法數
        weapon:0,//擁有武器數
        sacrificeNum:1,//血祭次數
        friendNum:1,//召朋友次數
        
        weaponChoose:"",//當前使用武器
        weaponAttack:0,
        weaponAttackBuff:0,
        
        hand:[]//手牌
        },
    methods: {
        rest:function rest(){},
        sacrifice:function sacrifice(){},
        }   
    
})

//////////////////////////////////////////建立Boss卡牌
function creatBossCard(){
    let bossCard=[];
    var tem=new CardMonster('boss1',"boss1.png",0,3,2,10,2,0,0,0,0,0,0);   bossCard.push(tem);
    
    var tem=new CardMonster("boss2","boss2.png",1,1,1,4,1,0,0,0,0,0,0);    bossCard.push(tem);
    
    var tem=new CardMonster("boss3","boss3.png",0,0,0,6,2,0,0,0,0,0,0);    bossCard.push(tem);
    
    var tem=new CardMonster("boss4","boss4.png",0,0,0,3,2,0,0,0,0,0,0);     bossCard.push(tem);
    
    var tem=new CardMonster("boss5","boss5.png",3,2,0,10,2,0,0,0,0,0,0);    bossCard.push(tem);
    
    var tem=new CardMonster("boss6","boss6.png",2,0,3,10,2,0,0,0,0,0,0);    bossCard.push(tem);   
    
    //洗牌
    let tmp ;
    let t = 0;
    for (let i = 0; i < bossCard.length; i++) {
        t = Math.floor((Math.random() * 5) + 1);
        tmp = bossCard[i];
        bossCard[i] = bossCard[t];
        bossCard[t] = tmp;
    }       
    //放回卡包組, //隨關卡增加
    bossCard[0].attack=bossCard[0].attack*1;
    card_list1.push(bossCard[0]);
    bossCard[1].attack=bossCard[1].attack*2;
    card_list2.push(bossCard[1]);
    bossCard[2].attack=bossCard[2].attack*2;
    card_list2.push(bossCard[2]);
    bossCard[3].attack=bossCard[3].attack*3;
    card_list3.push(bossCard[3]);
    bossCard[4].attack=bossCard[4].attack*3;
    card_list3.push(bossCard[4]);
    bossCard[5].attack=bossCard[5].attack*3;
    card_list3.push(bossCard[5]);
    console.log(bossCard);
}

/////////////////////////////////////////////////////level 1
//建立小怪
function creatMonsterCard1(){
    var tem=new CardMonster(1,"c1_1.png",2,0,1,3,1,0,0,0,0,0,0        );card_list1.push(tem);
    var tem=new CardMonster(2,"c1_2.png",1,2,0,3,1,0,0,0,0,0,0        );card_list1.push(tem);
    var tem=new CardMonster(3,"c1_3.png",1,2,0,3,1,0,0,0,0,0,0        );card_list1.push(tem);
    var tem=new CardMonster(4,"c1_4.png",0,1,2,4,1,0,0,0,0,0,0        );card_list1.push(tem);
    var tem=new CardMonster(5,"c1_5.png",1,2,0,5,1,0,0,0,0,0,0       );card_list1.push(tem);
    var tem=new CardMonster(6,"c1_6.png",0,1,2,5,1,0,0,0,0,0,0        );card_list1.push(tem);
    var tem=new CardMonster(7,"c1_7.png",0,2,1,3,0,1,0,0,0,0,0        );card_list1.push(tem);
    var tem=new CardMonster(8,"c1_8.png",1,2,0,3,0,0,1,0,0,0,0        );card_list1.push(tem);
    var tem=new CardMonster(9,"c1_9.png",2,0,1,3,0,0,0,0,1,0,0        );card_list1.push(tem);
    var tem=new CardMonster(10,"c1_10.png",0,1,2,3,0,0,0,0,0,1,0        );card_list1.push(tem);
    var tem=new CardMonster(11,"c1_11.png",2,1,0,3,0,0,0,0,0,0,1        );card_list1.push(tem);
    var tem=new CardMonster(12,"c1_12.png",1,0,2,3,0,0,0,1,0,0,0        );card_list1.push(tem);
       
}
//建立夥伴

function creatParnerCard1(){
    var tem=new CreatParnerCard(13,"c1_13.png",0,0,1);card_list1.push(tem);
    var tem=new CreatParnerCard(14,"c1_14.png",0,0,1);card_list1.push(tem);
    var tem=new CreatParnerCard(15,"c1_15.png",0,1,0);card_list1.push(tem);
    var tem=new CreatParnerCard(16,"c1_16.png",0,1,0);card_list1.push(tem);
    var tem=new CreatParnerCard(17,"c1_17.png",1,0,0);card_list1.push(tem);
    var tem=new CreatParnerCard(18,"c1_18.png",1,0,0);card_list1.push(tem);
   
} 
//建立武器
function creatWeaponCard1(){
    var tem=new CreatWeaponCard("c1_19","c1_19.png",0,0,1,"arrow");card_list1.push(tem);
    var tem=new CreatWeaponCard("c1_20","c1_20.png",1,0,0,"gun");card_list1.push(tem);
    var tem=new CreatWeaponCard("c1_21","c1_21.png",0,1,0,"sword");card_list1.push(tem);
   
}
//陷阱卡建構子
function creatTrapCard1(){
    var tem=new CreatTrapCard(22,"c1_22.png",2,0);card_list1.push(tem);
    var tem=new CreatTrapCard(23,"c1_23.png",0,2,2);card_list1.push(tem);
}
////建立治療卡
function creatTreatCard1(){
    var tem=new CreatTreatCard(24,"c1_24.png",1,1);card_list1.push(tem);
}

/////////////////////////////////////////////////////level 2
//建立小怪
function creatMonsterCard2(){
    var tem=new CardMonster(1,'c2_1.png',0,1,2,6,1,0,0,0,0,0,0);card_list2.push(tem);
    var tem=new CardMonster(2,'c2_2.png',2,0,1,6,1,0,0,0,0,0,0);card_list2.push(tem);
    var tem=new CardMonster(3,'c2_3.png',1,2,0,8,1,0,0,0,0,0,0);card_list2.push(tem);
    var tem=new CardMonster(4,'c2_4.png',0,1,2,8,1,0,0,0,0,0,0);card_list2.push(tem);
    var tem=new CardMonster(5,'c2_5.png',1,2,0,10,1,0,0,0,0,0,0);card_list2.push(tem);
    var tem=new CardMonster(6,'c2_6.png',2,0,1,10,1,0,0,0,0,0,0);card_list2.push(tem);
    var tem=new CardMonster(7,'c2_7.png',0,2,1,6,0,1,0,0,0,0,0);card_list2.push(tem);
    var tem=new CardMonster(8,'c2_8.png',1,2,0,6,0,0,1,0,0,0,0);card_list2.push(tem);
    var tem=new CardMonster(9,'c2_9.png',2,0,1,6,0,0,0,0,1,0,0);card_list2.push(tem);
    var tem=new CardMonster(10,'c2_10.png',0,1,2,6,0,0,0,0,0,1,0);card_list2.push(tem);
    var tem=new CardMonster(11,'c2_11.png',2,1,0,6,0,0,0,0,0,0,1);card_list2.push(tem);
    var tem=new CardMonster(12,'c2_12.png',1,0,2,6,0,0,0,1,0,0,0);card_list2.push(tem);
}

//建立夥伴
function creatParnerCard2(){
    var tem=new CreatParnerCard(13,'c2_13.png',0,0,2);card_list2.push(tem);
    var tem=new CreatParnerCard(14,'c2_14.png',0,2,0);card_list2.push(tem);
    var tem=new CreatParnerCard(15,'c2_15.png',2,0,0);card_list2.push(tem);
    
}
//建立武器
function creatWeaponCard2(){
    var tem=new CreatWeaponCard("c2_16",'c2_16.png',1,1,1,"gun arrow sword");card_list2.push(tem);//三重
    var tem=new CreatWeaponCard("c2_17",'c2_17.png',0,0,0,"");//HP-2
    tem.toolAbility=function(){
        role.weaponChoose='wraichWand';
    }    
        card_list2.push(tem);

}
//陷阱卡建構子
function creatTrapCard2(){
    var tem=new CreatTrapCard(18,'c2_18.png',3,0);card_list2.push(tem);
    var tem=new CreatTrapCard(19,'c2_19.png',3,0);card_list2.push(tem);
    var tem=new CreatTrapCard(20,'c2_20.png',0,1,3);card_list2.push(tem);
    //武器破壞 
    var tem=new CreatWeaponDestroyer(21,'c2_21.png');card_list2.push(tem); 
}
////建立治療卡
function creatTreatCard2(){
    var tem=new CreatTreatCard(22,'c2_22.png',3,1);card_list2.push(tem);
    var tem=new CreatTreatCard(23,'c2_23.png',3,1);card_list2.push(tem);
}
/////////////////////////////////////////////////////level 3
//建立小怪
function creatMonsterCard3(){
    var tem=new CardMonster(1,'c3_1.png',0,1,2,9,1,0,0,0,0,0,0);card_list3.push(tem);
    var tem=new CardMonster(2,'c3_2.png',1,2,0,9,1,0,0,0,0,0,0);card_list3.push(tem);
    var tem=new CardMonster(3,'c3_3.png',1,2,0,12,1,0,0,0,0,0,0);card_list3.push(tem);
    var tem=new CardMonster(4,'c3_4.png',2,0,1,12,1,0,0,0,0,0,0);card_list3.push(tem);
    var tem=new CardMonster(5,'c3_5.png',2,0,1,15,1,0,0,0,0,0,0);card_list3.push(tem);
    var tem=new CardMonster(6,'c3_6.png',0,1,2,15,1,0,0,0,0,0,0);card_list3.push(tem);
    var tem=new CardMonster(7,'c3_7.png',0,2,1,9,0,1,0,0,0,0,0);card_list3.push(tem);
    var tem=new CardMonster(8,'c3_8.png',1,2,0,9,0,0,1,0,0,0,0);card_list3.push(tem);
    var tem=new CardMonster(9,'c3_9.png',2,0,1,9,0,0,0,0,1,0,0);card_list3.push(tem);
    var tem=new CardMonster(10,'c3_10.png',0,1,2,9,0,0,0,0,0,1,0);card_list3.push(tem);
    var tem=new CardMonster(11,'c3_11.png',2,1,0,9,0,0,0,0,0,0,1);card_list3.push(tem);
    var tem=new CardMonster(12,'c3_12.png',1,0,2,9,0,0,0,1,0,0,0);card_list3.push(tem);
    
}

//建立武器伴
function creatWeaponCard3(){
    var tem=new CreatWeaponCard('c3_13','c3_13.png',0,0,4,'arrow');card_list3.push(tem);
    var tem=new CreatWeaponCard("c3_14",'c3_14.png',4,0,0,"gun");card_list3.push(tem);
    var tem=new CreatWeaponCard("c3_15",'c3_15.png',0,4,0,"sword");card_list3.push(tem);

}
//陷阱卡建構子
function creatTrapCard3(){
    var tem=new CreatTrapCard(16,'c3_16.png',0,1,4);card_list3.push(tem);
    var tem=new CreatTrapCard(17,'c3_17.png',0,1,4);card_list3.push(tem);
    var tem=new CreatTrapCard(18,'c3_18.png',4,0);card_list3.push(tem);
    var tem=new CreatTrapCard(19,'c3_19.png',4,0);card_list3.push(tem);
    //武器破壞 
    var tem=new CreatWeaponDestroyer(20,'c3_20.png');card_list3.push(tem);  
}
////建立治療卡
function creatTreatCard3(){
    var tem=new CreatTreatCard(21,'c3_21.png',5,1);card_list3.push(tem);
    var tem=new CreatTreatCard(22,'c3_22.png',5,1);card_list3.push(tem);    
} 


