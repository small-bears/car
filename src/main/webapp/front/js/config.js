
var projectName = '二手车交易网站';
/**
 * 轮播图配置
 */
var swiper = {
	// 设定轮播容器宽度，支持像素和百分比
	width: '100%',
	height: '400px',
	// hover（悬停显示）
	// always（始终显示）
	// none（始终不显示）
	arrow: 'none',
	// default（左右切换）
	// updown（上下切换）
	// fade（渐隐渐显切换）
	anim: 'default',
	// 自动切换的时间间隔
	// 默认3000
	interval: 2000,
	// 指示器位置
	// inside（容器内部）
	// outside（容器外部）
	// none（不显示）
	indicator: 'outside'
}

/**
 * 个人中心菜单
 */
var centerMenu = [{
	name: '个人中心',
	url: '../' + localStorage.getItem('userTable') + '/center.jsp'
}
]


var indexNav = [

{
	name: '二手车信息',
	url: './pages/ershouchexinxi/list.jsp'
}, 

{
	name: '新闻资讯',
	url: './pages/news/list.jsp'
},
]

var adminurl =  "http://localhost:8080/jspmin18p/index.jsp";

var cartFlag = false

var chatFlag = false


chatFlag = true


var menu = [{"backMenu":[{"child":[{"buttons":["新增","查看","修改","删除"],"menu":"用户","menuJump":"列表","tableName":"yonghu"}],"menu":"用户管理"},{"child":[{"buttons":["新增","查看","修改","删除"],"menu":"二手车分类","menuJump":"列表","tableName":"ershouchefenlei"}],"menu":"二手车分类管理"},{"child":[{"buttons":["新增","查看","修改","删除"],"menu":"二手车信息","menuJump":"列表","tableName":"ershouchexinxi"}],"menu":"二手车信息管理"},{"child":[{"buttons":["查看","修改","删除"],"menu":"定金支付","menuJump":"列表","tableName":"dingjinzhifu"}],"menu":"定金支付管理"},{"child":[{"buttons":["查看","修改","删除","审核"],"menu":"预约到店","menuJump":"列表","tableName":"yuyuedaodian"}],"menu":"预约到店管理"},{"child":[{"buttons":["查看","修改","删除","审核","评估报价"],"menu":"汽车评估","menuJump":"列表","tableName":"qichepinggu"}],"menu":"汽车评估管理"},{"child":[{"buttons":["查看","修改","删除"],"menu":"评估报价","menuJump":"列表","tableName":"pinggubaojia"}],"menu":"评估报价管理"},{"child":[{"buttons":["新增","查看","修改","删除"],"menu":"论坛管理","tableName":"forum"}],"menu":"论坛管理"},{"child":[{"buttons":["新增","查看","修改","删除"],"menu":"公告信息","tableName":"news"},{"buttons":["新增","查看","修改","删除"],"menu":"客服管理","tableName":"chat"},{"buttons":["新增","查看","修改","删除"],"menu":"轮播图管理","tableName":"config"}],"menu":"系统管理"}],"frontMenu":[{"child":[{"buttons":["查看","定金支付"],"menu":"二手车信息列表","menuJump":"列表","tableName":"ershouchexinxi"}],"menu":"二手车信息模块"}],"hasBackLogin":"是","hasBackRegister":"否","hasFrontLogin":"否","hasFrontRegister":"否","roleName":"管理员","tableName":"users"},{"backMenu":[{"child":[{"buttons":["查看","支付"],"menu":"定金支付","menuJump":"列表","tableName":"dingjinzhifu"}],"menu":"定金支付管理"},{"child":[{"buttons":["新增","查看","修改","删除"],"menu":"预约到店","menuJump":"列表","tableName":"yuyuedaodian"}],"menu":"预约到店管理"},{"child":[{"buttons":["新增","查看","修改","删除"],"menu":"汽车评估","menuJump":"列表","tableName":"qichepinggu"}],"menu":"汽车评估管理"},{"child":[{"buttons":["查看"],"menu":"评估报价","menuJump":"列表","tableName":"pinggubaojia"}],"menu":"评估报价管理"},{"child":[{"buttons":["查看","删除"],"menu":"我的收藏管理","tableName":"storeup"}],"menu":"我的收藏管理"}],"frontMenu":[{"child":[{"buttons":["查看","定金支付"],"menu":"二手车信息列表","menuJump":"列表","tableName":"ershouchexinxi"}],"menu":"二手车信息模块"}],"hasBackLogin":"是","hasBackRegister":"否","hasFrontLogin":"是","hasFrontRegister":"是","roleName":"用户","tableName":"yonghu"}]


var isAuth = function (tableName,key) {
    let role = localStorage.getItem("userTable");
    let menus = menu;
    for(let i=0;i<menus.length;i++){
        if(menus[i].tableName==role){
            for(let j=0;j<menus[i].backMenu.length;j++){
                for(let k=0;k<menus[i].backMenu[j].child.length;k++){
                    if(tableName==menus[i].backMenu[j].child[k].tableName){
                        let buttons = menus[i].backMenu[j].child[k].buttons.join(',');
                        return buttons.indexOf(key) !== -1 || false
                    }
                }
            }
        }
    }
    return false;
}

var isFrontAuth = function (tableName,key) {
    let role = localStorage.getItem("userTable");
    let menus = menu;
    for(let i=0;i<menus.length;i++){
        if(menus[i].tableName==role){
            for(let j=0;j<menus[i].frontMenu.length;j++){
                for(let k=0;k<menus[i].frontMenu[j].child.length;k++){
                    if(tableName==menus[i].frontMenu[j].child[k].tableName){
                        let buttons = menus[i].frontMenu[j].child[k].buttons.join(',');
                        return buttons.indexOf(key) !== -1 || false
                    }
                }
            }
        }
    }
    return false;
}
