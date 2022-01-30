//卡片建構子
function CardMonster(id,src,gun_short,sword_short,arrow_short,attack,exp,soul,order){
    this.id=id;
    this.src=src;
    this.gun_short=gun_short;
    this.sword_short=sword_short;
    this.arrow_short=arrow_short;
    this.attack=attack;
    this.exp=exp;
    this.soul=soul;
    this.order=order;//卡牌在場上順序
    
    //攻擊系統,靈魂系統
    this.attackEvent=function (){
        //role.hp--;
        //var card=this;
        role.hp=role.hp-ignoreNegative(this.gun_short-role.gun)-ignoreNegative(this.sword_short-role.sword)-ignoreNegative(this.arrow_short-role.arrow)-this.attack;
        role.exp=role.exp+this.exp;
                    
    };
    this.elementGet=function(){};

}

//大量建立卡牌
var card_list=[];
for(var i=0;i<25;i++)
{
    var src="c1_"+String(i+1)+".png";
    console.log(src);
    var tem=new CardMonster(i+1,src);
    card_list.push(tem);
}

//創立 VUE 物件
var role1 = new Vue({
    el: '#role1',
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
        friedn_sword:0,
        friend_arrow:0,
        },
    methods: {
        rest:function rest(){},
        sacrifice:function sacrifice(){},
        }   
    
})

//回合系統
var role=role1; 



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
        
    shuffle(card_list,24);//陣列，數量洗牌
    addOption();//戴入卡片
    setActive();//初始化下五張為active

    $("section").on ("click",".active",function(){
    $(this).addClass("flip");//點擊後翻面
    setNextActive(this.dataset.framework);//設上一張卡為active
    });

    //$('*').click(setAttack());
    
    
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