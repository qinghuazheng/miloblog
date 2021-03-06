//1.引入mongoose模块
let mongoose = require('mongoose');
//用ES6自带的Promise替换掉mongoose自带的promise库
mongoose.Promise = Promise;
let ObjectId = mongoose.Schema.Types.ObjectId;
let config = require('./config');
//2.连接数据库
mongoose.connect(config.dbUrl);
//3.定义Schema 定义文档的属性名和属性的类型
let UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    avatar:String
});
// 4.定义模型
let User = mongoose.model('User',UserSchema);
exports.User = User;

let CategorySchema = new mongoose.Schema({
    name:String
});
//得到分类的模型
let Category = mongoose.model('Category',CategorySchema);
//把操作数据库的模型导出
exports.Category = Category;

let ArticleSchema = new mongoose.Schema({
    title:String,
    content:String,
    pageView:{type:Number, default:0},
    commentCnt:{type:Number, default:0},
    category:{type:ObjectId,ref:'Category'},
    createAt:{type:Date,default:Date.now},
    //ref表示此外键引用的是User集合的主键
    user:{type:ObjectId,ref:'User'}//成为一个外键
});
let Article = mongoose.model('Article',ArticleSchema);
exports.Article = Article;

let CommentSchema = new mongoose.Schema({
    content:String,
    article:{type:ObjectId,ref:'Article'}, //Article集合的外键就叫article,它是个id
    commentId:{type:ObjectId, ref:'Comment'},    //回复评论id, 默认为0表示评论的是文章
    createAt:{type:Date,default:Date.now},
    //ref表示此外键引用的是User集合的主键
    user:{type:ObjectId,ref:'User'}
});
let Comment = mongoose.model('Comment',CommentSchema);
exports.Comment = Comment;