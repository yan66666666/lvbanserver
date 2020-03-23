let mongo = require("mongoose");
// mongod --dbpath=C:data/xx/
mongo.connect("mongodb://127.0.0.1:27017/lvpai",{useUnifiedTopology: true,useNewUrlParser:true})
mongo.connection.on("connected",err=>{
	console.log("连接成功")
})


let userHead = mongo.Schema({
	userName:{
		type:String,
		default:"旅拌"
	},
	signa:{
		type:String,
		default:"旅游全世界"
	},
	visitors:{
		type:Number,
		default:0
	},
	pwd:String,
	tel:String,
	sex:{
		type:String,
		default:"男"
	},
	age:{
		type:Number,
		default:18
	},
	attention:{
		type:Array,
		default:[]
	},
	fans:{
		type:Array,
		default:[]
	},
	userimg:{
		type:String,
		default:"http://47.101.144.230:3001/userimg/defaultimg.png"
	},
	regTime:{
		type:Date,
		default:new Date()
	}
})
let user = mongo.model("user",userHead)


let dynamicHead = mongo.Schema({
	content:String,
	pic:{
		type:String,
		default:""
	},
	tel:String,
	lab:String,
	like:{
		type:Array,
		default:[]
	},
	comments:{
		type:Array,
		default:[]
	},
	relTime:{
		type:Date,
		default:new Date()
	}
})
let dynamic = mongo.model("dynamic",dynamicHead)

let withsHead = mongo.Schema({
	chufa:String,
  	mudidi:String,
  	riqi:String,
	title:String,
	content:String,
	tel:String,
	pic:{
		type:String,
		default:""
	},
	like:{
		type:Array,
		default:[]
	},
	receive:{
		type:Array,
		default:[]
	},
	comments:{
		type:Array,
		default:[]
	},
	register:{
		type:Array,
		default:[]
	},
	relTime:{
		type:Date,
		default:new Date()
	}
})
let withs = mongo.model("withs",withsHead)



module.exports = {user,dynamic,withs}

