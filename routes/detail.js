
module.exports = function(app, connectionPool) {
    
    // /detail 이라는 도메인으로 들어오면 아래 메소드를 실행시키라느 의미
    //app.js에서 app.use('/detail', detail); 를통해 deatil.js를 호출했고, 여기로 연결됨
    /*router.get('/detail', function(req, res, next) {
        //views폴더안에있는 hdmain.ejs를 띄우고, title이라느 이름으로 testing 데이터를 전달하라
        res.render('detail', {
            testing: '값 전달 테스트'
        });
    });*/
    
    app.post('/detail', function() {
        
    });
    
    app.get('/detail/:id', function(req, res, next) {
        
        /* session 없을 땐 로그인 화면으로 */
        if(!req.session.user_name) {
            res.redirect('/');
        }
    
        console.log("session : " + req.session.user_name+" / "+req.session.emp_num);
        
        connectionPool.getConnection(function(err, connection) {
            connection.query('select * from happyday_master where 1=1 and happyday_id = ?;', req.params.id, function(error, rows) {
                
                console.log("rows : " + rows.length);
                
                if(error) {
                    connection.release();
                    throw error;
                }else {
                    if(rows.length > 0) {
                        res.render('detail', {data : rows[0], session : req.session});
                        connection.release();
                    }else {
                        res.redirect('/');
                        connection.release();
                    }    
                }
            });
        });
    });

}
