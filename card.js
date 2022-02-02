//怪物卡片建構子
function CardMonster(id,src,gun_short,sword_short,arrow_short,attack,exp,soul,order,trapOwner,trapAttack){
    this.id=id;
    this.src=src;
    this.gun_short=gun_short;
    this.sword_short=sword_short;
    this.arrow_short=arrow_short;
    this.attack=attack;//需扣除弱點後的傷害
    this.exp=exp;
    this.soul=soul;
    this.order=order;//卡牌在場上順序
    this.trap={trapOwner:role,trapAttack:0};//陷阱物件 預設trap傷害為0
    
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
        more_attack:0,//來自怪的傷害增加或減少，容許負值
        more_trapAttack:0,//受到陷阱傷害增加
        friend_free:false,//招伙伴免費
        magic:0,//擁有魔法數
        weapon:0,//擁有武器數
        sacrificeNum:1,//血祭次數
        friendNum:1,//召朋友次數
        weaponChoose:"",//當前使用武器
        },
    methods: {
        rest:function rest(){},
        sacrifice:function sacrifice(){},
        }   
    
})

//創立 VUE 物件
var role2= new Vue({
    el: '#role2 ',
    data:{
        id:2,
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
        more_trapAttack:0,//自帶受到額外陷阱傷害增加
        friend_free:false,//招伙伴免費
        magic:0,//擁有魔法數
        weapon:0,//擁有武器數
        sacrificeNum:1//血祭次數,一開始為一
        },
    methods: {
        rest:function rest(){},
        sacrifice:function sacrifice(){},
        }   
    
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