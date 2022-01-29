$(document).ready(function(){

})
//新增一張卡片
function addOption(){

  
			
    var text=element.name;
		var value=element.name;
    $('.teacher').append('<option value='+value+'>'+text+'</option>');// 動態新增選項
  
  }

function attackEvent(){

    role.hp=role.hp-ignoreNegative(gun_short-gun)-ignoreNegative(sword_short-sword)-ignoreNegative(arrow_short-arrow)-attack;
}

function encounter()
{
    
}

function ignoreNegative(num){
    if (num <0)
    {
     num=0;
     return num;
    }
    else
     return num
}