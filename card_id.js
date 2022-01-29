card_list =[
    {
            id:1,
            src:"c1_1.png",
            gun_short:2,
            sword_short:0,
            arrow_short:1,
            attack:3,
            exp:1,
            soul:0,
            restUp:0,
            friend_gun:0,
            friedn_sword:0,
            friend_arrow:0,
            UpAttack:0,
            //攻擊系統,靈魂系統
            attackEvent:function (){
                //role.hp--;
                //var card=this;
                role.hp=role.hp-ignoreNegative(this.gun_short-role.gun)-ignoreNegative(this.sword_short-role.sword)-ignoreNegative(this.arrow_short-role.arrow)-this.attack;
                role.exp=role.exp+this.exp;
                           
            },
            element:function elementGet(){},
        },
        
      ////////////////////////////////////////////////////////////////////////////////////////////////
      {
        id:2,
        src:"c1_2.png",
        gun_short:1,
        sword_short:2,
        arrow_short:0,
        attack:3,
        exp:1,
        soul:0,
        restUp:0,
        friend_gun:0,
        friedn_sword:0,
        friend_arrow:0,
        UpAttack:0,
        //攻擊系統,靈魂系統
        attackEvent:function (){
            //role.hp--;
            //var card=this;
            role.hp=role.hp-ignoreNegative(this.gun_short-role.gun)-ignoreNegative(this.sword_short-role.sword)-ignoreNegative(this.arrow_short-role.arrow)-this.attack;
            role.exp=role.exp+this.exp;
                       
        },
        element:function elementGet(){},
    },
    
  ////////////////////////////////////////////////////////////////////////////////////////////////
  {
    id:3,
    src:"c1_3.png",
    gun_short:1,
    sword_short:2,
    arrow_short:0,
    attack:3,
    exp:1,
    soul:0,
    restUp:0,
    friend_gun:0,
    friedn_sword:0,
    friend_arrow:0,
    UpAttack:0,
    //攻擊系統,靈魂系統
    attackEvent:function (){
        //role.hp--;
        //var card=this;
        role.hp=role.hp-ignoreNegative(this.gun_short-role.gun)-ignoreNegative(this.sword_short-role.sword)-ignoreNegative(this.arrow_short-role.arrow)-this.attack;
        role.exp=role.exp+this.exp;
                   
    },
    element:function elementGet(){},
},

////////////////////////////////////////////////////////
  {
    id:4,
    src:"c1_4.png",
    gun_short:0,
    sword_short:1,
    arrow_short:2,
    attack:4,
    exp:1,
    soul:0,
    restUp:0,
    friend_gun:0,
    friedn_sword:0,
    friend_arrow:0,
    UpAttack:0,
    //攻擊系統,靈魂系統
    attackEvent:function (){
        //role.hp--;
        //var card=this;
        role.hp=role.hp-ignoreNegative(this.gun_short-role.gun)-ignoreNegative(this.sword_short-role.sword)-ignoreNegative(this.arrow_short-role.arrow)-this.attack;
        role.exp=role.exp+this.exp;
                   
    },
    element:function elementGet(){},
},

////////////////////////////////////////////////////////////////////////////////////////////////
{
    id:5,
    src:"c1_5.png",
    gun_short:1,
    sword_short:2,
    arrow_short:0,
    attack:5,
    exp:1,
    soul:0,
    restUp:0,
    friend_gun:0,
    friedn_sword:0,
    friend_arrow:0,
    UpAttack:0,
    //攻擊系統,靈魂系統
    attackEvent:function (){
        //role.hp--;
        //var card=this;
        role.hp=role.hp-ignoreNegative(this.gun_short-role.gun)-ignoreNegative(this.sword_short-role.sword)-ignoreNegative(this.arrow_short-role.arrow)-this.attack;
        role.exp=role.exp+this.exp;
                   
    },
    element:function elementGet(){},
},

////////////////////////////////////////////////////////////////////////////////////////////////


]