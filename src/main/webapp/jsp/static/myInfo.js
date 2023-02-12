//设置用户个人中心入口
if(window.sessionStorage.getItem('role') != '管理员'){
	var accountTableName = window.sessionStorage.getItem('accountTableName');
	$('#myinfo').attr('href','#');
	$('#myinfo').on('click', function(e) {
		e.preventDefault();
		http(accountTableName+'/session','GET',{},(res)=>{
			if(res.code == 0){
				window.sessionStorage.setItem('id',res.data.id);
				window.sessionStorage.setItem('onlyme',true);
				window.location.href = baseUrl + 'jsp/modules/' + accountTableName + '/add-or-update.jsp';
			}					
		});	
	});			
}