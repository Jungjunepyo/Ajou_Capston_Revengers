var express = require('express');
var router = express.Router();
const guestModel = require('../schemas/createGuest');
// const hostModel = require('../schemas/createHost');

router.get('/',function(req, res, error){
    console.log(req.headers);
    res.send({state:0});
})

//사용자를 인증하는 함수
var authUser = function(database,id,password,callback){
    console.log('authUser 호출됨');

    //users 컬렉션 참조
    var users = database.collection('users');

    //아이디와 비밀번호르 사용해 검색
    users.find({"id":id, "password":password}).toArray(function(err, docs){
        if(err){
            callback(err,null);
            return;
        }
        if(docs.length>0){
            console.log('ID [%s]는 이미 존재하는 ID입니다.',id);
            callback(null, docs);
        }else{
            console.log("사용가능한 ID 입니다.");
            callback(null,null);
        }        
    });
}

//사용자를 추가하는 함수
var addUser = function(database, id, password, name, callback){
    console.log('회원가입 호출됨:'+id+', '+password+', '+name);

    var users=database.collection('users');

    users.insertMany([{"ID":id, "password":password, "name":name}], function(err, result){
        if(err){
        callback(err, null);
        return;
    }


    if(result.insertedCount>0){
        console.log("사용자 레코드 추가됨 : " + result.insertedCount);
    } else{
        console.log("추가된 레코드가 없음.");
    }
    
    callback(null, result);
    });
}

module.exports = router;