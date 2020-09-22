$(function() {
    // クリック回数の初期設定
    var click_count = 0;
    // クリックしたカードのidを格納する配列の初期設定。
    // ゲーム終了後に最も多くクリックした画像を表示するのに利用する。
    var clicked_card_index = [];
    // ペアが揃った回数の初期設定
    var pair_count = 0;

    function turnToFront() {
        /*
         * カードをに表に返す
         */
        // 1枚目にクリックしたカードかどうかを判断するフラグを外す
        $('.clicked').removeClass('clicked');
        // 全カードのクリック禁止フラグを外す
        $('.disable').removeClass('disable');
    }

    function drawClickScore() {
        /*
         * ゲーム終了後、クリック回数の成績(A,B,C)を表示する
         */
        $('.click_count').text(click_count);
        if (click_count < 50) {
            var score_text = 'S';
        } else if (50 <= click_count && click_count < 60) {
            var score_text = 'A';
        } else if (60 <= click_count && click_count < 75) {
            var score_text = 'B';
        } else {
            var score_text = 'C';
        }
        $('.click_score').text(score_text);
        $('.click_score').addClass(score_text);
    }

    function finishGame() {
        /*
         * ゲーム終了時の処理
         */
        // タイマーをストップする
        stopTimer();
        // 最も多くクリックした猫の画像を表示する
        drawMostClickedImg();
        // 経過時間の成績を表示する
        drawTimeScore();
        // クリック回数の成績を表示する
        drawClickScore();
        // 祝福ポップアップを表示する
        showConglatsPopup();
    }

    function checkMostValue(array) {
        /*
         * 最も多くクリックした猫の画像のidを返す
         */
        var counter = []
        for (var i = 0; i <= total_pair_count; i++) {
            counter.push(0);
        }
        $.each(array, function(index, value) {
            counter[value]++
        });
        var max_count = Math.max.apply([], Object.values(counter));
        var result = Object.keys(counter).filter(function(k) {
            return counter[k] === max_count
        })[0];
        return result
    }

    function drawMostClickedImg() {
        /*
         * ゲーム終了後、最も多くクリックした猫の画像を表示する
         */
        var most_clicked_value = checkMostValue(clicked_card_index);
        $('#most_clicked_img').attr('src', './img/img_' + most_clicked_value + '.png');
    }

    // カードをクリックしたときの挙動
    $('.board').click(function() {
        // すでにペアが揃っている場合、1回目にクリックしたカードの場合、カードをひっくり返すアニメーションが再生中の場合は何もしない。
        if ($(this).hasClass('paired') || $(this).hasClass('clicked') || $(this).hasClass('disable')) {
            return;
        }
        // 1回目にクリックしたカード
        var clicked_card = $('div .board.clicked');
        var clicked_card_id = clicked_card.find('img').attr('id');
        var this_id = $(this).find('img').attr('id');
        // クリックしたカードのidをclicked_card_indexに格納
        clicked_card_index.push(this_id);
        click_count++;
        $(this).addClass('clicked');
        if (click_count % 2) {
            // ひっくりかえしたカードが1枚目の時は、これ以降の処理をしない（click_countが奇数の場合、1枚目と判断）
            return;
        }
        // 以降の処理が終わるまで、全カードをクリック禁止にする
        $('.board').addClass('disable');
        // カードのペアが揃った場合
        if (clicked_card_id === this_id) {
            // そろった場合はpairedクラスを追加し、カードは裏返したままにする
            $(this).addClass('paired');
            clicked_card.addClass('paired');
            pair_count++;
            // カードをに表に返す(待ち時間なし)
            turnToFront();
            // 全てのペアが揃ったらゲーム終了
            if (pair_count === total_pair_count) {
                finishGame();
            }
            return;
        }
        // カードをに表に返す(待ち時間あり)
        setTimeout(turnToFront, 900);
    });
});
