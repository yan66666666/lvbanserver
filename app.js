let Koa = require("koa");
let server = new Koa();
server.listen(3001,err=>{
	console.log("后端服务器已监听3000端口，如果有人向3000端口发请求，服务器就会做出响应")
})

let Static = require("koa-static")
server.use(Static("./src"))
let cors = require("koa2-cors")
server.use(cors())
let body = require("koa-body")
server.use(body())

let multer = require("koa-multer")
//tool就是一个接收器的实例，在实例时至少要告诉它 图片 存储的地址
var storage = multer.diskStorage({
  //文件保存路径
  //destination目标址
  //request 这一请求 的信息（req.url  req.query 。。。）
  //file 文件信息 （文件名 文件大小  文件的内容）
  //cb -> callback ->回调函数
  destination: function (req, file, cb) {
    cb(null, 'src/upload/')
  },
  //修改文件名称
  filename: function (req, file, cb) {
  	//以点分割成数组，数组的最后一项就是后缀名
  	// 声明一个变量 = 文件.原始的文件名（sew213.jpg）.slit(".") -> [sew213,jpg]
    var fileFormat = (file.originalname).split("."); 
           //1234567890 + "." + 
    cb(null,getDate() + "." + fileFormat.pop());
  }
})


let {user,dynamic,withs}=require("./mongo")


let Router = require("koa-router")
let router = new Router();
server.use(router.routes())




function getDate(){
	var time = new Date();
//	console.dir(time)  //日期对象
	//1.获取年
	var year = time.getFullYear(); //2019
	//2.获取月
	var month = time.getMonth()+1; //月的范围是0-11
	//3.获取日
	var day = time.getDate();
	//4.获取星期
	var week = time.getDay();//3 //星期范围是0-6,星期天是一周第一天
	var weekStr = "日一二三四五六";
	var week1 = weekStr[week]; //三
	//5.获取小时
	var hours = time.getHours(); //小时范围是 0-23
	//6.获取分钟
	var minutes = time.getMinutes(); //分钟范围是 0-59
	//7.获取秒
	var seconds = time.getSeconds(); //秒范围是 0-59
	//8.获取毫秒
	var seconds2 = time.getMilliseconds()
	return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}-${seconds2}`
}
let tool = multer({storage})

//在/upload请求响应时，就接收单独的一张图片
router.post("/upload",tool.single("file"),(ctx,next)=>{
	ctx.body = ctx.req.file.filename;       
})


router.post("/user",async (ctx,next)=>{
	let web = ctx.request.body;
	let oneRow = new user(web);
	ctx.body = await oneRow.save()
})

router.get("/user",async (ctx,next)=>{
	let tel = ctx.query.tel
	let a = await user.findOne({tel})
	if(a==null){
		ctx.body = "可以使用"
	}else{
		ctx.body = a
	}
})

router.get("/users",async (ctx,next)=>{
	let a = await user.find()
	ctx.body = a
})

router.post("/dynamic",async (ctx,next)=>{
	let web = ctx.request.body;
//	console.log(web)
	let oneRow = new dynamic(web);
	ctx.body = await oneRow.save()
})

router.get("/dynamic",async (ctx,next)=>{
	let tel = ctx.query.tel
	let a = await dynamic.find({tel})
	ctx.body = a
})

router.put("/user",async (ctx,next)=>{
	let tel = ctx.query.tel
	let web = ctx.request.body;
	let a = await user.updateOne({tel},web)
	if(a.nModified == 1){
		ctx.body = "修改成功"
	}
	ctx.body = "修改失败"
})

router.post("/withs",async (ctx,next)=>{
	let web = ctx.request.body;
//	console.log(web)
	let oneRow = new withs(web);
	ctx.body = await oneRow.save()
})

router.get("/withs",async (ctx,next)=>{
	let a = await withs.find().sort({relTime:-1})
	ctx.body = a
})

router.get("/withsdel",async (ctx,next)=>{
	let _id = ctx.query.id
	let a = await withs.findOne({_id})
	ctx.body = a
})


router.put("/receive",async (ctx,next)=>{
	let _id = ctx.query.id
	
	let web = ctx.request.body
	let a = await withs.updateOne({_id},{receive:web})
	if(a.nModified == 1){
		ctx.body = "收藏成功"
	}
	ctx.body = "您已收藏"
})

router.put("/like",async (ctx,next)=>{
	let _id = ctx.query.id
	let web = ctx.request.body
	let a = await withs.updateOne({_id},{like:web})
	if(a.nModified == 1){
		ctx.body = "点赞成功"
	}
	ctx.body = "您已点赞"
})

router.put("/comments",async (ctx,next)=>{
	let _id = ctx.query.id
	console.log(_id)
	let web = ctx.request.body
	console.log(web)
	let a = await withs.updateOne({_id},{comments:web})
	console.log(a)
	if(a.nModified == 1){
		ctx.body = "评论成功"
	}
	ctx.body = "评论失败"
})

router.put("/comlike",async (ctx,next)=>{
	let _id = ctx.query.id
	let web = ctx.request.body
	let a = await withs.updateOne({_id},web)
	if(a.nModified == 1){
		ctx.body = "点赞成功"
	}
	ctx.body = "您已点赞"
})

router.put("/register",async (ctx,next)=>{
	let _id = ctx.query.id
	let web = ctx.request.body
	let a = await withs.updateOne({_id},{register:web})
	if(a.nModified == 1){
		ctx.body = "点赞成功"
	}
	ctx.body = "您已点赞"
})

router.put("/usmylike",async (ctx,next)=>{
	let _id = ctx.query.id

	let web = ctx.request.body
	let a = await dynamic.updateOne({_id},web)
	if(a.nModified == 1){
		ctx.body = "点赞成功"
	}
	ctx.body = "您已点赞"
})

router.put("/useratt",async (ctx,next)=>{
	let tel = ctx.query.tel

	let web = ctx.request.body
	let a = await user.updateOne({tel},{attention:web})
	if(a.nModified == 1){
		ctx.body = "关注成功"
	}else{
		ctx.body = "您已关注"
	}
	
})

router.put("/fk",async (ctx,next)=>{
	let tel = ctx.query.tel
	let vis = ctx.query.vis
	let a = await user.updateOne({tel},{visitors:+vis})

	ctx.body = "成功"
})







