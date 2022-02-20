//有「每」的功能尚未完成
skill_list =[
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
            other.monsterBuff=other.monsterBuff+3;
            },
        },

    {    id:"j3",
        name:"thief",
        exp:1,
        ability:function(){//立即HP少2，並未來執行陷阱卡時，對手HP-1
            other.hp=role.hp-2;
            other.more_trapAttack=other.more_trapAttack+1;//受到更多傷害

            },
        },
    {   id:"j4",
        name:"pope",
        exp:1,
        ability:function(){
            role.hp=role.hp+8;
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
        role.isLord=true;

            },
        },
    {   id:"j7",
        name:"cleric",
        exp:2,
        ability:function(){//HP+2並休息+2
            role.hp=role.hp+2;
            role.restUp=role.restUp+2;
            },
        },
    {   id:"j8",
        name:"warrior",//可使用兩把武器
        exp:2,
        ability:function(){
            role.isWarrior=true;

            },
        },
    {   id:"j9",
        name:"wizard",
        exp:4,
        ability:function(){//每有一種魔法，怪物HP-2
            role.isWizard=true;
            },
        },
    {   id:"j10",
        name:"bard",
        exp:3,
        ability:function(){//放置一指示物保護伙伴，並使其能力加2
            if(role==role1)
                {
                role1.hand.push(this);//加入手牌
                let frame=role1.hand.indexOf(this);
                $('#toolList_role1').append('<img class="bardTool tool" data-framework="'+frame+'" src="img/music.png"/>');
                }
            if(role==role2)
                {
                role2.hand.push(this);//加入手牌
                let frame=role2.hand.indexOf(this);
                $('#toolList_role2').append('<img class="bardTool tool" data-framework="'+frame+'" src="img/music.png"/>');
                }
            },
        toolAbility:function(){
            $(".friend").addClass("canMusic");
            $("#toolBar").one("click",".canMusic",function(){
                console.log(this.id);
                let clickParner=role.hand.filter(word => word.id==this.id);

                switch(clickParner[0].type){
                    case "gun":
                        clickParner[0].friend_gun=clickParner[0].friend_gun+2;
                        break; 
                    case "sword":
                        clickParner[0].friend_sword=clickParner[0].friend_sword+2;
                        break;
                    case "arrow":
                        clickParner[0].friend_arrow=clickParner[0].friend_arrow+2;
                        break;
                }
                $(".canMusic").removeClass("canMusic" );
    
                }) 
                //以下計數朋友傷害
                let arrow=0;
                let gun=0;
                let sword=0;

                for (var item of role.handFriend){//總計朋友武器值計數器
                    arrow=arrow+item.friend_arrow;
                    gun=gun+item.friend_gun;
                    sword=sword+item.friend_sword;
                           
                    console.log("arrow"+item.friend_arrow);
                    console.log("gun"+item.friend_gun);
                    console.log("sword"+item.friend_sword);
                   
                }
                role.friend_arrow=arrow;
                role.friend_gun=gun;
                role.friend_sword=sword;
            }
        },
    {   id:"j11",
        name:"weapon master",
        exp:4,
        ability:function(){//每有一武器，怪物HP-1
            role.isWeaponMaster=true;
            },
        },
    {   id:"j12",
        name:"hero",
        exp:4,
        ability:function(){//自帶三種武器//未完成
            role.isHero=true;
            },
        },
    {   id:"j13",
        name:"noble",
        exp:5,
        ability:function(){
            role.exp=role.exp+2;
            endAction('',false);
            canActive();//可再點卡  

            },
        },
    {   id:"j14",
        name:"guider",
        exp:5,
        ability:function(){
            role.isGuider=true;//擁有五個魔法即獲勝

            },
            },
////////////////////////////////////////////////////////////////////////////////////////////////


]