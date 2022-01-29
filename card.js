
//創立 VUE 物件
var role = new Vue({
    el: '#role',
    data:{
        hp:8,
        exp:0,
        //attack:0;
        gun:0,
        sword:0,
        arrow:0,
        num:3,
        restUp:3,
        soul:0,
        },
    methods: {
        rest:function rest(){},
        sacrifice:function sacrifice(){},
        }   
    
})

//創立 VUE 物件
var card=new Vue({
    el: '#card',
    data:{
        gun_short:0,
        sword_short:0,
        arrow_short:0,
        attack:1,
        exp:1,
        soul:0,
        //攻擊系統,靈魂系統
        attackEvent:function (){
            //role.hp--;
            role.hp=role.hp-ignoreNegative(card.gun_short-role.gun)-ignoreNegative(card.sword_short-role.sword)-ignoreNegative(card.arrow_short-role.arrow)-card.attack;
            role.exp=role.exp+card.exp;
            
            
        },
    },
    methods:{
        
        element:function elementGet(){},
        UpAttack:function UpAttack(){},
        //attackEvent:function attackEvent(){},
        restUp:function restUp(){}
    }
})
$(document).ready(function(){
    $('#cost').click( function(){ role.hp--;})
    $('#attack').click( function(){ card.attackEvent();})

    })
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