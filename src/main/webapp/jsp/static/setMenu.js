		function setMenu(){
			$('#navUl').append("<li class=\"nav-item dropdown\"><a class=\"nav-link dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">个人中心</a><div class=\"dropdown-menu\"><a class=\"dropdown-item\" href="+baseUrl+"jsp/modules/center/updatePassword.jsp"+">修改密码</a><a id=\"myinfo\" class=\"dropdown-item\" href="+baseUrl+"jsp/modules/center/info.jsp"+">个人信息</a></div></li>")
			var role = window.sessionStorage.getItem('role');
			for(var i=0;i<menus.length;i++){
				// 找到当前登录角色的菜单
				if(menus[i].roleName == role){
					var menu = menus[i].backMenu;
					for(var j=0;j<menu.length;j++){  
						// 一级菜单
						var menuItem = document.createElement('li');
						menuItem.setAttribute('class','nav-item dropdown');
						
						var itemHref = document.createElement('a');
						itemHref.setAttribute("class","nav-link dropdown-toggle");
						itemHref.setAttribute('data-toggle','dropdown');
						itemHref.setAttribute('href','#');
						itemHref.setAttribute("role","button");
						itemHref.setAttribute("aria-haspopup","true");
						itemHref.setAttribute("aria-expanded","false");
						itemHref.innerHTML = menu[j].menu;		
						
						menuItem.appendChild(itemHref);
						
						
						var menuChildDiv = document.createElement('div');
						menuChildDiv.setAttribute('class','dropdown-menu');
						
						
						var menuChild = menu[j].child;
						
						var secondMenuName = "";
						for(var k=0;k<menuChild.length;k++){  
							// 二级菜单
							var menuChildHref = document.createElement('a');
							menuChildHref.setAttribute("class","dropdown-item");
							if(secondMenuName == menuChild[k].tableName && secondMenuName != ""){
								var childHrefAttr = "${pageContext.request.contextPath}/jsp/modules/" + menuChild[k].tableName + "/graph.jsp" ;
								
							}else{
								var childHrefAttr = "" ;
                                                                if(menuChild[k].tableName.length>6 && menuChild[k].tableName.substr(0, 6)=="orders") {
									//订单管理
                                                                        var orderStatus =  menuChild[k].tableName.substr(7);
                                                                	childHrefAttr = "${pageContext.request.contextPath}/jsp/modules/orders/list.jsp?orderStatus="+orderStatus ;
                                                                }else {
                                                                	childHrefAttr = "${pageContext.request.contextPath}/jsp/modules/" + menuChild[k].tableName + "/list.jsp" ;
                                                                }
                                                                secondMenuName = menuChild[k].tableName;
							}
							menuChildHref.setAttribute('href',childHrefAttr);
							menuChildHref.innerHTML =  menuChild[k].menu ;
							menuChildDiv.appendChild(menuChildHref);
						}
						menuItem.appendChild(menuChildDiv);
						$('#navUl').append(menuItem);
					}
				}
			}
		}
