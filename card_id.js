ability_list =[
    {   id:"j1",
        name:"adventure",
        exp:4,
        ability:function(){
            var get=$("section .active");//抓取為有Active 的卡
            console.log(get.length);
            for(let i=0;i<get.length;i++)
            {
                console.log(get[i].dataset.framework);
                let framework=get[i].dataset.framework;
                //使第二層的可以點擊
                let tem='[data-framework='+String(framework-5)+']';//往上抓取一張
                
                if($(tem).hasClass("flip")){$(tem).addClass("active magicPower")};//如果該卡有被翻卡，即設為active
                
            }

        },
    },

    {   id:"j2",
        name:"Curseman",
        exp:5,
        ability:function(){//對手怪物HP+3
            other.monsterBuff=this+3;
            },
        },

    {    id:"j3",
        name:"thief",
        exp:1,
        ability:function(){//立即HP少2，並未來執行陷阱卡時，對手HP-1
            other.hp=this-2;
            other.more_trapAttack=this+1;//受到更多傷害

            },
        },
    {   id:"j4",
        name:"pope",
        exp:1,
        ability:function(){
            role.hp=this+8;
            },
        },
    {   id:"j5",
        name:"rune master",
        exp:2,
        ability:function(){
            role.runeMasterMagic=true;//是否有血祭效果一半的魔法

            },
        },
    {   id:"j6",
        name:"lord",
        exp:1,
        ability:function(){//招伙伴免費
        role.friend_free=true;

            },
        },
    {   id:"j7",
        name:"cleric",
        exp:2,
        ability:function(){//HP+2並休息+2
        role.hp=this+2;
        role.restUp=this+2;
            },
        },
    {   id:"j8",
        name:"warrior",//可使用兩把武器尚未完成
        exp:2,
        ability:function(){
        role.monsterBuff=this-1;

            },
        },
    {   id:"j9",
        name:"wizard",
        exp:4,
        ability:function(){//每有一種魔法，怪物HP-2
        role.monsterBuff=this-(2*magicOwn);
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