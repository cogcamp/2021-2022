var mainScene = new Phaser.Scene("mainScene");

mainScene.create = function() {
    // 初期設定を実行する
    this.config();
    
    // ボール作成
    this.createBall();
    
    // パドル作成
    this.createPaddle();
    
    // スペースキーのクリックでボール発射
    this.input.keyboard.on('keydown-SPACE', function(event) {
        // ゲーム開始状態ならば
        if (this.paddle.isStart) {
            // ボール発射
            this.ball.setVelocity(this.ballSpeedX, this.ballSpeedY);
            this.paddle.isStart = false;
        }
    }, this);
    
    // ブロック作成
    this.createBlocks();
    
    // ライフのテキスト表示
    this.lifeText = this.add.text(30, 20, 'ライフ：' + this.life, {
        font: '20px Open Sans',
        fill: "#FFFFFF"
    });
    
     //スコアのテキスト表示
    var score = 0;
    this.scoreText = this.add.text( 170, 20, "スコア : " + this.score,{
      font: "20px Open Sans",
      fill: "#FFFFFF"  
    })
};

mainScene.update = function() {
    // ボールがシーンの最下部に到達した
    if (this.ball.y >= this.game.config.height - this.ball.width / 2) {
        this.failToHit();
    }
    
    // キーボードのカーソルオブジェクトを取得
    var cursors = this.input.keyboard.createCursorKeys();
    var x = 0;
    // 右カーソルをクリックすると
    if(cursors.right.isDown) {
        x = this.paddle.x + this.paddleSpeed;
        this.paddle.x = Phaser.Math.Clamp(x, 52, 748);
    }
    // 左カーソルをクリックすると
    if(cursors.left.isDown) {
        x = this.paddle.x - this.paddleSpeed;
        this.paddle.x = Phaser.Math.Clamp(x, 52, 748);
    }
    
    // パドルの上にボールが乗っているなら
    if(this.paddle.isStart) {
        this.ball.setPosition(this.paddle.x, 500);
    }
};

mainScene.config = function() {
    // 背景色の設定
    this.cameras.main.setBackgroundColor("#808080");
    
    // パドルの移動速度
    this.paddleSpeed = 10;
    
    // ボール発射の加速度
    this.ballSpeedX = 0;
    this.ballSpeedY = -300;
    
    // ライフ
    this.life = 3;
    
   //スコア
    this.score = 0;
};

mainScene.createBall = function() {
    // ボール作成
    this.ball = this.physics.add.image(400, 500, 'ball1');
    this.ball.setDisplaySize(22,22);
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1);

};

mainScene.createPaddle = function() {
     // パドル作成
    this.paddle = this.physics.add.image(400, 550, 'paddle1');
    this.paddle.setDisplaySize(104,24);
    this.paddle.setImmovable();
    this.paddle.isStart = true;
    this.physics.add.collider(this.paddle, this.ball, this.hitPaddle, null, this);
};

mainScene.hitPaddle = function (paddle, ball) {
    // ボールにX方向の角度を設定
    var diff = 0;
    if (ball.x < paddle.x) {
        // ボールがパドルの左側に衝突
        diff = paddle.x - ball.x;
        ball.setVelocityX(-10 * diff);
    } else if (ball.x > paddle.x) {
        // ボールがパドルの右側に衝突
        diff = ball.x -paddle.x;
        ball.setVelocityX(10 * diff);
    } else {
        // X方向の加速度はなし
        ball.setVelocityX(0);
    }
};

mainScene.createBlocks = function() {
    
    // ブロックの色の配列
    var blockColors = [ 'red1'];
    
    // 物理エンジン対象固定オブジェクトグループ作成
    this.blocks = this.physics.add.staticGroup();
    
    // ハート作成

      　　　　var color = blockColors;
            var block = this.blocks.create(80 + 8 * 32, 80 + 1 * 16, color);
            block.setOrigin(0,0);
            block.setDisplaySize(32, 16);
            block.refreshBody();
            
    　　　　var color = blockColors;
            var block = this.blocks.create(80 + 7 * 32, 80 + 1 * 16, color);
            block.setOrigin(0,0);
            block.setDisplaySize(32, 16);
            block.refreshBody();
    
        　　var color = blockColors;
            var block = this.blocks.create(80 + 12 * 32, 80 + 1 * 16, color);
            block.setOrigin(0,0);
            block.setDisplaySize(32, 16);
            block.refreshBody();
            
            var color = blockColors;
            var block = this.blocks.create(80 + 13 * 32, 80 + 1 * 16, color);
            block.setOrigin(0,0);
            block.setDisplaySize(32, 16);
            block.refreshBody();
            
            for( var j = 6; j < 10; j++) {
            var color = blockColors;
            var block = this.blocks.create(80 + j * 32, 80 + 2 * 16, color);
            block.setOrigin(0,0);
            block.setDisplaySize(32, 16);
            block.refreshBody();
             }
             
             for( var j = 11; j < 15; j++) {
            var color = blockColors;
            var block = this.blocks.create(80 + j * 32, 80 + 2 * 16, color);
            block.setOrigin(0,0);
            block.setDisplaySize(32, 16);
            block.refreshBody();
             }
             
            for( var j = 5; j < 16; j++) {
            var color = blockColors;
            var block = this.blocks.create(80 + j * 32, 80 + 3 * 16, color);
            block.setOrigin(0,0);
            block.setDisplaySize(32, 16);
            block.refreshBody();
             }
             
            for( var j = 4; j < 17; j++) {
            var color = blockColors;
            var block = this.blocks.create(80 + j * 32, 80 + 4 * 16, color);
            block.setOrigin(0,0);
            block.setDisplaySize(32, 16);
            block.refreshBody();
             }
             
            for( var j = 3; j < 18; j++) {
            var color = blockColors;
            var block = this.blocks.create(80 + j * 32, 80 + 5 * 16, color);
            block.setOrigin(0,0);
            block.setDisplaySize(32, 16);
            block.refreshBody();
             }
             
            for( var j = 2; j < 19; j++) {
            var color = blockColors;
            var block = this.blocks.create(80 + j * 32, 80 + 6 * 16, color);
            block.setOrigin(0,0);
            block.setDisplaySize(32, 16);
            block.refreshBody();
             }
    
            for( var j = 1; j < 20; j++) {
            var color = blockColors;
            var block = this.blocks.create(80 + j * 32, 80 + 7 * 16, color);
            block.setOrigin(0,0);
            block.setDisplaySize(32, 16);
            block.refreshBody();
             }
             
            for( var j = 0; j < 21; j++) {
            var color = blockColors;
            var block = this.blocks.create(80 + j * 32, 80 + 8 * 16, color);
            block.setOrigin(0,0);
            block.setDisplaySize(32, 16);
            block.refreshBody();
             }
             
            for( var j = 0; j < 21; j++) {
            var color = blockColors;
            var block = this.blocks.create(80 + j * 32, 80 + 9 * 16, color);
            block.setOrigin(0,0);
            block.setDisplaySize(32, 16);
            block.refreshBody();
             }
             
            for( var j = 0; j < 21; j++) {
            var color = blockColors;
            var block = this.blocks.create(80 + j * 32, 80 + 10 * 16, color);
            block.setOrigin(0,0);
            block.setDisplaySize(32, 16);
            block.refreshBody();
             }
             
            for( var j = 0; j < 21; j++) {
            var color = blockColors;
            var block = this.blocks.create(80 + j * 32, 80 + 11 * 16, color);
            block.setOrigin(0,0);
            block.setDisplaySize(32, 16);
            block.refreshBody();
             }
             
            for( var j = 0; j < 21; j++) {
            var color = blockColors;
            var block = this.blocks.create(80 + j * 32, 80 + 12 * 16, color);
            block.setOrigin(0,0);
            block.setDisplaySize(32, 16);
            block.refreshBody();
             }
             
            for( var j = 1; j < 20; j++) {
            var color = blockColors;
            var block = this.blocks.create(80 + j * 32, 80 + 13 * 16, color);
            block.setOrigin(0,0);
            block.setDisplaySize(32, 16);
            block.refreshBody();
             }
             
            for( var j = 2; j < 19; j++) {
            var color = blockColors;
            var block = this.blocks.create(80 + j * 32, 80 + 14 * 16, color);
            block.setOrigin(0,0);
            block.setDisplaySize(32, 16);
            block.refreshBody();
             }
             
            for( var j = 3; j < 18; j++) {
            var color = blockColors;
            var block = this.blocks.create(80 + j * 32, 80 + 15 * 16, color);
            block.setOrigin(0,0);
            block.setDisplaySize(32, 16);
            block.refreshBody();
             }
             
            for( var j = 4; j < 17; j++) {
            var color = blockColors;
            var block = this.blocks.create(80 + j * 32, 80 + 16 * 16, color);
            block.setOrigin(0,0);
            block.setDisplaySize(32, 16);
            block.refreshBody();
             }
             
            for( var j = 5; j < 16; j++) {
            var color = blockColors;
            var block = this.blocks.create(80 + j * 32, 80 + 17 * 16, color);
            block.setOrigin(0,0);
            block.setDisplaySize(32, 16);
            block.refreshBody();
             }
             
            for( var j = 6; j < 15; j++) {
            var color = blockColors;
            var block = this.blocks.create(80 + j * 32, 80 + 18 * 16, color);
            block.setOrigin(0,0);
            block.setDisplaySize(32, 16);
            block.refreshBody();
             }
             
            for( var j = 7; j < 14; j++) {
            var color = blockColors;
            var block = this.blocks.create(80 + j * 32, 80 + 19 * 16, color);
            block.setOrigin(0,0);
            block.setDisplaySize(32, 16);
            block.refreshBody();
             }
             
            for( var j = 8; j < 13; j++) {
            var color = blockColors;
            var block = this.blocks.create(80 + j * 32, 80 + 20 * 16, color);
            block.setOrigin(0,0);
            block.setDisplaySize(32, 16);
            block.refreshBody();
             }
             
            for( var j = 9; j < 12; j++) {
            var color = blockColors;
            var block = this.blocks.create(80 + j * 32, 80 + 21 * 16, color);
            block.setOrigin(0,0);
            block.setDisplaySize(32, 16);
            block.refreshBody();
             }
             
            for( var j = 10; j < 11; j++) {
            var color = blockColors;
            var block = this.blocks.create(80 + j * 32, 80 + 22 * 16, color);
            block.setOrigin(0,0);
            block.setDisplaySize(32, 16);
            block.refreshBody();
             }
             
    this.physics.add.collider(this.ball, this.blocks, this.hitBlock, null, this);
};

   mainScene.hitBlock = function (ball, block) {
     //スコアを加算
    this.score += 10;
    this.scoreText.text = 'スコア：' + this.score;
    // 衝突したブロックを削除
    block.destroy();
    // ブロックの残りを判定
    if (this.blocks.countActive() == 0) {
        // ブロックがなくなると、0.5秒後にゲームクリア
        this.time.addEvent({
            duration: 500,
            callback: this.gameClear,
            loop: false,
            callbackScope: this,
        });
    }
};

mainScene.gameClear = function() {
    // ゲームクリア
    alert("おめでとうございます");
    // スタートシーンに移動
    this.scene.start("startScene");
};

mainScene.failToHit =  function () {
    // ボールを打ち返すことに失敗
    this.ball.setVelocity(0);
    this.paddle.isStart = true;
    // ライフを減らす
    this.life--;
    this.lifeText.text = 'ライフ：' + this.life;
     //スコアを減らす
    this.score -= 50;
     this.scoreText.text = 'スコア：' + this.score;
    // ライフが0になると
    if(this.life <= 0) {
        // 0.5秒後にゲームオーバー
        this.time.addEvent({
            duration: 500,
            callback: this.gameOver,
            loop: false,
            callbackScope: this,
        });
    }
};

mainScene.gameOver = function() {
    // ゲームオーバー
    alert("ゲームオーバー" + "  "　+ this.scoreText.text + "です");
    // スタートシーンに移動
    this.scene.start("startScene");
};
