ability_list =[
    { 
        name:"adventure",
        exp:4,
        ability:function(){//選牌時可選第二張公開的卡片
            $
            },
        },

    { 
        name:"Curseman",
        exp:5,
        ability:function(){//對手怪物HP+3
            other.more_attack=this+3;//other 未設定
            },
        },

    { 
        name:"thief",
        exp:1,
        ability:function(){//立即HP少2，並未來執行陷阱卡時，對手HP-1
            other.hp=this-2;
            other.more_trapAttack=this+1;//受到更多傷害

            },
        },
    { 
        name:"pope",
        exp:1,
        ability:function(){
            role.hp=this+8;
            },
        },
    { 
        name:"rune master",
        exp:2,
        ability:function(){

            },
        },
    { 
        name:"lord",
        exp:1,
        ability:function(){//招伙伴免費
        role.friend_free=true;

            },
        },
    { 
        name:"cleric",
        exp:2,
        ability:function(){//HP+2並休息+2
        role.hp=this+2;
        role.restUp=this+2;
            },
        },
    { 
        name:"warrior",
        exp:2,
        ability:function(){
        role.more_attack=this-1;

            },
        },
    { 
        name:"wizard",
        exp:4,
        ability:function(){//每有一種魔法，怪物HP-2
        role.more_attack=this-(2*maigic);
            },
        },
    { 
        name:"bard",
        exp:3,
        ability:function(){

            },
        },
    { 
        name:"weapon master",
        exp:4,
        ability:function(){//每有一武器，怪物HP-1
        role.more_more_attack=this-(1*weapon);
            },
        },
    { 
        name:"hero",
        exp:4,
        ability:function(){//自帶三種武器
        role.gun=this+1;
        role.sword=this+1;
        role.arrow=this+1;
            },
        },
    { 
        name:"noble",
        exp:5,
        ability:function(){

            },
        },
    { 
        name:"guider",
        exp:5,
        ability:function(){

            },
            },
////////////////////////////////////////////////////////////////////////////////////////////////


]