function getRoleButtons() {
	var role = window.sessionStorage.getItem('role');
	var allButtons = ["新增", "修改", "查看", "删除", "审核", "回复", "发货", "确认收货", "报表", "支付", "查看评论", "打印", "导出"];
	for (var i = 0; i < menus.length; i++) {
		// 找到当前登录角色的菜单
		if (menus[i].roleName == role) {
			//后台菜单
			var backMenu = menus[i].backMenu;
			for (var j = 0; j < backMenu.length; j++) {
				// 一级菜单
				var menuChild = backMenu[j].child;
				for (var k = 0; k < menuChild.length; k++) {
					// 二级菜单
					if (tableName == menuChild[k].tableName) {
						var buttons = menuChild[k].buttons;
						//console.log("you can see: "+buttons);
						//将allButtons剔除能看到的按钮，剩下的就是不能看到的按钮
						if(buttons && buttons.length>0){
							for(var l=0;l<buttons.length;l++){
								if(allButtons.includes(buttons[l])){
									var index = allButtons.indexOf(buttons[l]);
									allButtons.splice(index,1);
									//console.log("l="+l+","+allButtons);
								}
								
							}
						}					
						//console.log("you can't see: "+allButtons);
						for (var m=0; m<allButtons.length; m++) {						
							var elements = document.getElementsByClassName(allButtons[m]);
							for (var n = elements.length - 1; n >= 0; n--) {
								elements[n].parentNode.removeChild(elements[n]);
							}						
						}
					}

				}
			}
		}
	}
}
