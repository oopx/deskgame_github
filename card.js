//怪物卡片建構子
function CardMonster(id,src,gun_short,sword_short,arrow_short,attack,exp,fire,water,earth,thunder,poison,light){
    this.id=id;
    this.src=src;
    this.gun_short=gun_short;
    this.sword_short=sword_short;
    this.arrow_short=arrow_short;
    this.attack=attack;//需扣除弱點後的傷害
    this.exp=exp;
    this.order=0;//卡牌在場上順序
    this.trap={trapOwner:role,trapAttack:0};//陷阱物件 預設trap傷害為0
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
            case "gun":this.gun_short=ignoreNegative(this.gun_short-role.gun);
                break;
            case "sword":this.sword_short=ignoreNegative(this.sword_short-role.sword);
                break;
            case "arrow":this.arrow_short=ignoreNegative(this.arrow_short-role.arrow);
                break;
            case "wraichWand":this.attack=ignoreNegative(this.attack-2);//針對真傷武器
                break;
            default: {
                break;
                }
        }
        //陷阱傷害計算
        if(this.trap.trapOwner!=role.id){role.hp=role.hp-role.more_trapAttack-this.trap.trapAttack}//若卡上有非自己的陷阱，將發動傷害效果
        //攻擊血量計算
        role.hp=role.hp-ignoreNegative(this.gun_short-role.friend_gun)-ignoreNegative(this.sword_short-role.friend_sword)-ignoreNegative(this.arrow_short-role.friend_arrow)-this.attack;
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
    this.trap={trapOwner:role,trapAttack:0};
    this.attackEvent=function(){//點擊後執行
        role.friend_gun=role.friend_gun+this.friend_gun;
        role.friend_sword=role.friend_sword+this.friend_sword;
        role.friend_arrow=role.friend_arrow+this.friend_arrow;
        role.hp=role.hp-role.friendNum;//號召夥伴花的血量
        role.friendNum++;//號召朋友的次數
        //加入手牌
        if(role==role1)
            {$('#toolList_role1').append('<img class="tool" src="img/'+this.src+'"/>');}
        if(role==role2)
            {$('#toolList_role2').append('<img class="tool" src="img/'+this.src+'"/>');}
        //陷阱傷害計算
        if(this.trap.trapOwner!=role.id){role.hp=role.hp-role.more_trapAttack-this.trap.trapAttack};


        
    }
}
//武器卡片建構子
function CreatWeaponCard(id,src,gun,sword,arrow){
    this.id=id;
    this.src=src;
    this.gun=gun,
    this.sword=sword,
    this.arrow=arrow,
    this.order=0,
    this.toolAbility=function(){};//放入toolBar的時候可執行的能力
    this.trap={trapOwner:role,trapAttack:0};
    this.attackEvent=function(){//點擊後執行
        //加入手牌
        if(role==role1)
            {$('#toolList_role1').append('<img class="tool" src="img/'+this.src+'"/>');}
        if(role==role2)
            {$('#toolList_role2').append('<img class="tool" src="img/'+this.src+'"/>');}
        
        if(this.gun>role.gun){role.gun=this.gun};
        if(this.sword>role.sword){role.sword=this.sword};
        if(this.arrow>role.arrow){role.arrow=this.arrow};       //換上最強的武器
        //陷阱傷害計算
        if(this.trap.trapOwner!=role.id){role.hp=role.hp-role.more_trapAttack-this.trap.trapAttack};
    }
}
//陷阱卡建構子
function CreatTrapCard(id,src,attack,isTrap,trapAttack_origin){
    this.id=id;
    this.src=src;
    this.attack=attack;
    this.order=0;
    this.trapAttack_origin=trapAttack_origin;
    //放入toolBar的時候，被點擊可執行的能力
    this.toolAbility=function(thisIcon){ 
        notActive();
        $('.card').addClass("canTrap");//可加陷阱的class
        $(thisIcon).remove();;//點完圖後，該圖移除        
       // let framework=thisIcon.dataset.framework;
       // role.hand[framework].setTrapAbility();//執行role的能力  

        
        $("section").one("click",'.canTrap',function(event){ 
            //console.log(this.dataset.framework);
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
    this.trap={trapOwner:role,trapAttack:0};
    
    this.handFrame="";//陷阱於手億的位置
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
            
           // role1.hand.push(this);//加入手牌

            }
            //{$('#toolList_role1>.trapTool').removeClass("used")}//開啟，使陷阱可使用
        if(role==role2)
            {
            role2.hand.push(this);//加入手牌, 一次兩張
            role2.hand.push(this);//加入手牌
            let frame=role2.hand.indexOf(this);

            $('#toolList_role2').append('<img class="trapTool tool" data-framework="'+frame+'" tool" src="img/t0_4.png"/>');
            $('#toolList_role2').append('<img class="trapTool tool" data-framework="'+(frame+1)+'" tool" src="img/t0_4.png"/>');

            }   
            //{$('#toolList_role2>.trapTool').removeClass("used")}//開啟，使陷阱可使用
        //陷阱傷害計算
        if(this.trap.trapOwner!=role.id){role.hp=role.hp-role.more_trapAttack-this.trap.trapAttack};

    }
    // //可移植給角色的設陷阱能力
    // this.abilitySetTrap=function abilitySetTrap(){ 

    //     let temtrapAttack_origin =this.trapAttack_origin; //將此陷阱的傷害傳入      
    //     $("section").one("click",'.canTrap',function(event){ 
    //         //console.log(this.dataset.framework);
    //         event.stopPropagation();//防冒泡(實驗)
    
    //         setTrap(this.dataset.framework,temtrapAttack_origin);//取得該卡的位置，原始傷害2
            
            
    //         $(this).removeClass("canTrap");//每個圖只能加一次
    //         console.log(this);
    //         //$(this).off();// 移除On 避免之前開陷阱留下的事件
    //         //加上陷阱
            
    //         let tem=($(".rest").attr("disabled"));//陷阱後，若原本已無行動，便不再恢復
    //         if(tem!="disabled")
    //             {canActive();}
    //         $('.canTrap').removeClass("canTrap");//移除陷阱的class
    //         })
            
      
    // }
    // //給ROLE設陷阱的能力
    // this.setTrapAbility=function setTrapAbility(){
    //     role.ability=this.abilitySetTrap();
    // }
}
//建立治療卡
function CreatTreatCard(id,src,treat,restUp){
    this.id=id;
    this.src=src;
    this.treat=treat;
    this.restUp=restUp;
    this.order=0;
    this.trap={trapOwner:role,trapAttack:0};
    this.attackEvent=function(){
        role.restUp=role.restUp+this.restUp;
        role.hp=role.hp+this.treat;
        //陷阱傷害計算
        if(this.trap.trapOwner!=role.id){role.hp=role.hp-role.more_trapAttack-this.trap.trapAttack};
    
    }
}

//創立 VUE 物件
var role1= new Vue({
    el: '#role1 ',
    data:{
        id:1,
        hp:8,
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
        elementGet:{
            fire:0,
            water:0,
            earth:0,
            thunder:0,
            poison:0,
            light:0
        },
        ability:function ability(){alert("joke")},
        more_attack:0,//來自怪的傷害增加或減少，容許負值
        more_trapAttack:0,//受到陷阱傷害增加
        friend_free:false,//招伙伴免費
        magic:0,//擁有魔法數
        weapon:0,//擁有武器數
        sacrificeNum:1,//血祭次數
        friendNum:1,//召朋友次數
        weaponChoose:"",//當前使用武器
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
        id:2,
        hp:9,
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
        elementGet:{
            fire:0,
            water:0,
            earth:0,
            thunder:0,
            poison:0,
            light:0
        },
        more_attack:0,//來自怪的傷害增加或減少，容許負值
        more_trapAttack:0,//受到陷阱傷害增加
        friend_free:false,//招伙伴免費
        magic:0,//擁有魔法數
        weapon:0,//擁有武器數
        sacrificeNum:1,//血祭次數
        friendNum:1,//召朋友次數
        weaponChoose:"",//當前使用武器
        hand:[]//手牌
        },
    methods: {
        rest:function rest(){},
        sacrifice:function sacrifice(){},
        }   
    
})

//建立卡牌
// function creatMonsterCard(num){
//     for(var i=0;i<num;i++)
//     {
//         var src="c1_"+String(i+1)+".png";
//         console.log(src);
//         var tem=new CardMonster(i+1,src,1,1,1,1,1,0,0,0,0,0,1);
//         card_list.push(tem);
//     }
//   }
/////////////////////////////////////////////////////level 1
//建立小怪
function creatMonsterCard1(){
    var tem=new CardMonster(1,"c1_1.png",2,0,1,0,1,0,0,0,0,0,0        );card_list.push(tem);
    var tem=new CardMonster(2,"c1_2.png",1,2,0,0,1,0,0,0,0,0,0        );card_list.push(tem);
    var tem=new CardMonster(3,"c1_3.png",1,2,0,0,1,0,0,0,0,0,0        );card_list.push(tem);
    var tem=new CardMonster(4,"c1_4.png",0,1,2,1,1,0,0,0,0,0,0        );card_list.push(tem);
    var tem=new CardMonster(5,"c1_5.png",1,2,0,2,1,0,0,0,0,0,0       );card_list.push(tem);
    var tem=new CardMonster(6,"c1_6.png",0,1,2,2,1,0,0,0,0,0,0        );card_list.push(tem);
    var tem=new CardMonster(7,"c1_7.png",0,2,1,0,0,1,0,0,0,0,0        );card_list.push(tem);
    var tem=new CardMonster(8,"c1_8.png",1,2,0,0,0,0,1,0,0,0,0        );card_list.push(tem);
    var tem=new CardMonster(9,"c1_9.png",2,0,1,0,0,0,0,0,1,0,0        );card_list.push(tem);
    var tem=new CardMonster(10,"c1_10.png",0,1,2,0,0,0,0,0,0,1,0        );card_list.push(tem);
    var tem=new CardMonster(11,"c1_11.png",2,1,0,0,0,0,0,0,0,0,1        );card_list.push(tem);
    var tem=new CardMonster(12,"c1_12.png",1,0,2,0,0,0,0,1,0,0,0        );card_list.push(tem);
       
}
//建立Boss卡牌
function creatBossCard1(){
    var tem=new CardMonster(25,"boss1.png",0,3,2,10,2,0,0,0,0,0,0);
    tem.attack=tem.attack*level-tem.gun_short-tem.arrow_short-tem.arrow_short;//隨關卡增加，並扣除原已扣在破綻的傷害
    card_list.push(tem);
}
//建立夥伴

function creatParnerCard1(){
    var tem=new CreatParnerCard(13,"c1_13.png",0,0,1);card_list.push(tem);
    var tem=new CreatParnerCard(14,"c1_14.png",0,0,1);card_list.push(tem);
    var tem=new CreatParnerCard(15,"c1_15.png",0,1,0);card_list.push(tem);
    var tem=new CreatParnerCard(16,"c1_16.png",0,1,0);card_list.push(tem);
    var tem=new CreatParnerCard(17,"c1_17.png",1,0,0);card_list.push(tem);
    var tem=new CreatParnerCard(18,"c1_18.png",1,0,0);card_list.push(tem);
   
} 
//建立武器
function creatWeaponCard1(){
    var tem=new CreatWeaponCard(19,"c1_19.png",0,0,1);card_list.push(tem);
    var tem=new CreatWeaponCard(20,"c1_20.png",1,0,0);card_list.push(tem);
    var tem=new CreatWeaponCard(21,"c1_21.png",0,1,0);card_list.push(tem);
   
}
//陷阱卡建構子
function creatTrapCard1(){
    var tem=new CreatTrapCard(22,"c1_22.png",2,0);card_list.push(tem);
    var tem=new CreatTrapCard(23,"c1_23.png",0,2,5);card_list.push(tem);
}
////建立治療卡
function creatTreatCard1(){
    var tem=new CreatTreatCard(24,"c1_24.png",1,1);card_list.push(tem);
}

/////////////////////////////////////////////////////level 2
//建立小怪
function creatMonsterCard2(){
    var tem=new CardMonster(1,'c2_1.png',0,1,2,6,1,0,0,0,0,0,0);card_list.push(tem);
    var tem=new CardMonster(2,'c2_2.png',2,0,1,6,1,0,0,0,0,0,0);card_list.push(tem);
    var tem=new CardMonster(3,'c2_3.png',1,2,0,8,1,0,0,0,0,0,0);card_list.push(tem);
    var tem=new CardMonster(4,'c2_4.png',0,1,2,8,1,0,0,0,0,0,0);card_list.push(tem);
    var tem=new CardMonster(5,'c2_5.png',1,2,0,10,1,0,0,0,0,0,0);card_list.push(tem);
    var tem=new CardMonster(6,'c2_6.png',2,0,1,10,1,0,0,0,0,0,0);card_list.push(tem);
    var tem=new CardMonster(7,'c2_7.png',0,2,1,6,0,1,0,0,0,0,0);card_list.push(tem);
    var tem=new CardMonster(8,'c2_8.png',1,2,0,6,0,0,1,0,0,0,0);card_list.push(tem);
    var tem=new CardMonster(9,'c2_9.png',2,0,1,6,0,0,0,0,1,0,0);card_list.push(tem);
    var tem=new CardMonster(10,'c2_10.png',0,1,2,6,0,0,0,0,0,1,0);card_list.push(tem);
    var tem=new CardMonster(11,'c2_11.png',2,1,0,6,0,0,0,0,0,0,1);card_list.push(tem);
    var tem=new CardMonster(12,'c2_12.png',1,0,2,6,0,0,0,1,0,0,0);card_list.push(tem);
}


//建立Boss卡牌
function creatBossCard2(){
    
}
//建立夥伴
function creatParnerCard2(){
    var tem=new CreatParnerCard(13,'c2_13.png',0,0,2);card_list.push(tem);
    var tem=new CreatParnerCard(14,'c2_14.png',0,2,0);card_list.push(tem);
    var tem=new CreatParnerCard(15,'c2_15.png',2,0,0);card_list.push(tem);
    
}
//建立武器
function creatWeaponCard2(){
    var tem=new CreatWeaponCard(16,'c2_16.png',1,1,1);card_list.push(tem);//三重
    var tem=new CreatWeaponCard(17,'c2_17.png',0,0,0);//HP-2
    tem.toolAbility=function(){
        role.weaponChoose='wraichWand';
    }    
        card_list.push(tem);
    
            
            

    
}
//陷阱卡建構子
function creatTrapCard2(){
    var tem=new CreatTrapCard(18,'c2_18.png',3,0);card_list.push(tem);
    var tem=new CreatTrapCard(19,'c2_19.png',3,0);card_list.push(tem);
    var tem=new CreatTrapCard(20,'c2_20.png',0,3);card_list.push(tem);
    var tem=new CreatTrapCard(21,'c2_21.png',0,0);//武器破壞  
    
    tem.toolAbility={}
    card_list.push(tem); 
}
////建立治療卡
function creatTreatCard2(){
    var tem=new CreatTreatCard(22,'c2_22.png',3,1);card_list.push(tem);
    var tem=new CreatTreatCard(23,'c2_23.png',3,1);card_list.push(tem);
}
/////////////////////////////////////////////////////level 3
//建立小怪
function creatMonsterCard3(){
    
}
//建立Boss卡牌
function creatBossCard3(){
    
}
//建立夥伴
function creatParnerCard3(){
    
}
//建立武器
function creatWeaponCard3(){
    
}
//陷阱卡建構子
function creatTrapCard3(){
    
}
////建立治療卡
function creatTreatCard3(){
    
} 

