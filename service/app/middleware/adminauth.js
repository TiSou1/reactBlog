module.exports = options => {
     return async function adminauth(ctx,next){
        console.log("session:获取到",ctx.session.openId);
        if(ctx.session.openId){
            //登录成功 拿到session,执行下一个路由     
            await next();
        }else{       
            //否则返回
            ctx.body = {data:'未登录'};
        }
}
}
