function crossBtnControl(btnName){
	var role = window.sessionStorage.getItem('role');
	
	for(var i=0;i<menus.length;i++){
		// 找到当前登录角色的菜单
		if(menus[i].roleName == role){
			var menu = menus[i].backMenu;
			for(var j=0;j<menu.length;j++){  
				// 一级菜单
				var menuChild = menu[j].child;
				var secondMenuName = "";
				for(var k=0;k<menuChild.length;k++){  
					//定位到当前list页
					if(menuChild[k].tableName == tableName && k == 0){
						var allButtons = menuChild[k].buttons;
						if(allButtons.includes(btnName)){
							return true;
						}else{
							return false;
						}
					}
				}
			}
		}
	}
}