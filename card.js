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
    this.trap={trapOwner:role,trapAttack:0};
    this.attackEvent=function(){//點擊後執行
        //$('#toolList_role1').append('<img class="tool" src="img/'+this.src+'"/>');//加入手牌
        if(role==role1)
            {$('#toolList_role1').append('<img class="tool" src="img/'+this.src+'"/>');}
        if(role==role2)
            {$('#toolList_role2').append('<img class="tool" src="img/'+this.src+'"/>');}
        
        if(this.gun>role.gun){role.gun=this.gun};
        if(this.sword>role.wsord){role.sword=this.sword};
        if(this.arrow>role.arrow){role.arrow=this.arrow};       //換上最強的武器
    }
}
//陷阱卡建構子
function CreatTrapCard(id,src,attack,isTrap){
    this.id=id;
    this.src=src;
    this.attack=attack;
    this.order=0;
    this.trap={trapOwner:role,trapAttack:0};
    this.attackEvent=function(){
        other.hp=other.hp-this.attack;
        if(isTrap==0)return;//若該陷阱卡無帶可設陷阱
        
        if(role==role1)
            {$('#toolList_role1>.trapTool').removeClass("used")}//開啟，使陷阱可使用
        if(role==role2)
            {$('#toolList_role2>.trapTool').removeClass("used")}//開啟，使陷阱可使用

    }
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

//創立 VUE 角色物件
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
//建立小怪
function creatMonsterCard(){
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
function creatBossCard(){
    var tem=new CardMonster(25,"boss1.png",1,1,1,1,1,0,0,0,0,0,1);
    tem.attack=tem.attack*level;//隨關卡增加
    card_list.push(tem);

}
//建立夥伴

function creatParnerCard(){
    var tem=new CreatParnerCard(13,"c1_13.png",0,0,1);card_list.push(tem);
    var tem=new CreatParnerCard(14,"c1_14.png",0,0,1);card_list.push(tem);
    var tem=new CreatParnerCard(15,"c1_15.png",0,1,0);card_list.push(tem);
    var tem=new CreatParnerCard(16,"c1_16.png",0,1,0);card_list.push(tem);
    var tem=new CreatParnerCard(17,"c1_17.png",1,0,0);card_list.push(tem);
    var tem=new CreatParnerCard(18,"c1_18.png",1,0,0);card_list.push(tem);
   
} 
//建立武器
function creatWeaponCard(){
    var tem=new CreatWeaponCard(19,"c1_19.png",0,0,1);card_list.push(tem);
    var tem=new CreatWeaponCard(20,"c1_20.png",1,0,0);card_list.push(tem);
    var tem=new CreatWeaponCard(21,"c1_21.png",0,1,0);card_list.push(tem);
   
}



//陷阱卡建構子
function creatTrapCard(){
    var tem=new CreatTrapCard(22,"c1_22.png",2,0);card_list.push(tem);
    var tem=new CreatTrapCard(23,"c1_23.png",0,2);card_list.push(tem);
}


////建立治療卡
function creatTreatCard(){
    var tem=new CreatTreatCard(24,"c1_24.png",1,1);card_list.push(tem);
}


    

