//怪物卡片建構子
function CardMonster(id,src,gun_short,sword_short,arrow_short,attack,exp,soul,order,trapOwner,trapAttack){
    this.id=id;
    this.src=src;
    this.gun_short=gun_short;
    this.sword_short=sword_short;
    this.arrow_short=arrow_short;
    this.attack=attack;
    this.exp=exp;
    this.soul=soul;
    this.order=order;//卡牌在場上順序
    this.trap={trapOwner:role,trapAttack:trapAttack};
    
    //攻擊系統,靈魂系統
    this.attackEvent=function(){
        console.log(role.hp);
        //var card=this;
        //role.hp++;
        
        role.hp=role.hp-ignoreNegative(this.gun_short-role.friend_gun)-ignoreNegative(this.sword_short-role.friend_sword)-ignoreNegative(this.arrow_short-role.friend_arrow)-this.attack;
        //role.exp=role.exp+this.exp;
                    
    };
    this.elementGet=function(){};

}
//大怪卡片建構子
function CardBoss(id,src,gun_short,sword_short,arrow_short,level,bassAttack,exp,soul,order){
    this.id=id;
    this.src=src;
    this.gun_short=gun_short;
    this.sword_short=sword_short;
    this.arrow_short=arrow_short;
    this.level=level;
    this.bassAttack=bassAttack;
    this.attack=bassAttack*this.level;
    this.exp=exp;
    this.soul=soul;
    this.order=order;//卡牌在場上順序
    
    
    //攻擊系統,靈魂系統
    this.attackEvent=function(){
        console.log(role.hp);
        //var card=this;
        //role.hp++;
        role.hp=role.hp-ignoreNegative(this.gun_short-role.friend_gun)-ignoreNegative(this.sword_short-role.friend_sword)-ignoreNegative(this.arrow_short-role.friend_arrow)-this.attack;
        //role.exp=role.exp+this.exp;      //attack 的攻擊應拆分成可抵及不可抵的，未完成。         
    };
    this.elementGet=function(){};

}

//大量建立卡牌
var card_list=[];
for(var i=0;i<24;i++)
{
    var src="c1_"+String(i+1)+".png";
    console.log(src);
    var tem=new CardMonster(i+1,src,1,1,1,1,1);
    card_list.push(tem);
}
//建立魔王卡
var tem=new CardBoss(25,"boss1.png",1,1,1,10,1,1);
card_list.push(tem);


//創立 VUE 物件
var role1 = new Vue({
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
        more_attack:0,//來自怪的傷害增加或減少，容許負值
        more_trapAttack:0,//受到陷阱傷害增加
        friend_free:false,//招伙伴免費
        magic:0,//擁有魔法數
        weapon:0,//擁有武器數
        },
    methods: {
        rest:function rest(){},
        sacrifice:function sacrifice(){},
        }   
    
})
var role2 = new Vue({
    el: '#role2 ',
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
        },
    methods: {
        rest:function rest(){},
        sacrifice:function sacrifice(){},
        }   
    
})

//回合系統
var role=role2; 
var other=role1;



// //創立 VUE 物件
// var card1 = new Vue({
//     el: '#card1',
//     data:{
//         id:1,
//         gun_short:0,
//         sword_short:0,
//         arrow_short:0,
//         attack:1,
//         exp:1,
//         soul:0,
//         //攻擊系統,靈魂系統
//         attackEvent:function (){
//             //role.hp--;
//             var card=this;
//             role.hp=role.hp-ignoreNegative(card.gun_short-role.gun)-ignoreNegative(card.sword_short-role.sword)-ignoreNegative(card.arrow_short-role.arrow)-card.attack;
//             role.exp=role.exp+card.exp;
            
            
//         },
//     },
//     methods:{
        
//         element:function elementGet(){},
//         UpAttack:function UpAttack(){},
//         //attackEvent:function attackEvent(){},
//         restUp:function restUp(){}
//     }
// })

// //創立 VUE 物件
// var card2 = new Vue({
//     el: '#card2',
//     data:{
//         id:2,
//         gun_short:0,
//         sword_short:0,
//         arrow_short:0,
//         attack:2,
//         exp:2,
//         soul:0,
//         //攻擊系統,靈魂系統
//         attackEvent:function (){
//             //role.hp--;
//             var card=this;
//             role.hp=role.hp-ignoreNegative(card.gun_short-role.gun)-ignoreNegative(card.sword_short-role.sword)-ignoreNegative(card.arrow_short-role.arrow)-card.attack;
//             role.exp=role.exp+card.exp;
            
            
//         },
//     },
//     methods:{
        
//         element:function elementGet(){},
//         UpAttack:function UpAttack(){},
//         //attackEvent:function attackEvent(){},
//         restUp:function restUp(){}
//     }
// })

// //創立 VUE 物件
// var card3 = new Vue({
//     el: '#card3',
//     data:{
//         id:3,
//         gun_short:0,
//         sword_short:0,
//         arrow_short:0,
//         attack:3,
//         exp:3,
//         soul:0,
//         //攻擊系統,靈魂系統
//         attackEvent:function (){
//             //role.hp--;
//             var card=this;
//             role.hp=role.hp-ignoreNegative(card.gun_short-role.gun)-ignoreNegative(card.sword_short-role.sword)-ignoreNegative(card.arrow_short-role.arrow)-card.attack;
//             role.exp=role.exp+card.exp;
            
            
//         },
//     },
//     methods:{
        
//         element:function elementGet(){},
//         UpAttack:function UpAttack(){},
//         //attackEvent:function attackEvent(){},
//         restUp:function restUp(){}
//     }
// })
//////////////以上為卡片參數
//card=[,card1,card2,card3];


$(document).ready(function(){
    //$('#cost').click( function(){ role1.hp--;});
    //$('#attack').click( function(){ card1.attackEvent();});
    // $('.memory-card').click( function(){ 
    //     //console.log(card[this.dataset.framework].attack);
    //     //card[this.dataset.framework].attackEvent()
        
    //    // alert(this.dataset.framework);
    //     })
    setStart();//初始化
        $("section").on ("click",".active",function(){
        $(this).addClass("used");//點擊後消失
        setNextActive(this.dataset.framework);//設上一張卡為active
        getCard(this.dataset.framework);//發動點擊該卡的效果
    });

    $(".buttonTrap").on("click",function(){
        $('.active').addClass("unactive");
        $('.active').removeClass("active");
        $('.card').addClass("canTrap");//可加陷阱的class
               
            
        })

         
    $("section").on("click",'.canTrap',function(){ 
        //console.log(this.dataset.framework);
        setTrap(this.dataset.framework);
        $(this).removeClass("canTrap");//每個圖只能加一次
        console.log(this);
        $(this).off();// 移除On 避免之前開陷阱留下的事件
        //加上陷阱
        })

    $('.buttonUnTrap').click(function(){
        $('.unactive').addClass("active");//激活點擊功能
        $('.unactive').removeClass("unactive");//取消無法點卡
        $('.canTrap').removeClass("canTrap");//移除陷阱的class
    })

    
    
    
})
    

//const cards = document.querySelectorAll('.memory-card');
//cards.forEach(card => card.addEventListener('click', flipCard));//點擊後翻面
/*
friend
{
    payHp();
    UpAttack();

}
weapon
{
    type:[gun,sword,arrow];
    upAttack();
}
treat
{
    HpUp();
    restUp();

}
trap
{
    
}
monster
{
    //payHp:;
    expUp();
    elementGet();
    gun_short:
    sword_short:
    arrow_short:
    attack:

}
*/