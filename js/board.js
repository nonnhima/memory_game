$(function() {
    // ペアになるカードの枚数を宣言
    total_pair_count = 12;
    // ペアになるカードの枚数分の数字の配列を作成
    var numbers = Array(total_pair_count).fill(0).map((v, i) => i + 1);
    // 作成した配列をコピーして繋げる。同じ数字が２つずつ格納されている状態。
    numbers = numbers.concat(numbers);

    function shuffle(array) {
        // 配列をシャッフルするメソッド
        for (let i = array.length - 1; i >= 0; i--) {
            let rand = Math.floor(Math.random() * (i + 1));
            // 配列の数値を入れ替える
            [array[i], array[rand]] = [array[rand], array[i]]
        }
        return array;
    }

    // 画像をシャッフルして表示する
    $.each(shuffle(numbers), function(index, val) {
        $('div.flip-boards').append('<div class="board"><div class="front"></div><div class="flipped"><img src="./img/img_' + val + '.png" id="' + val + '"></div></div>');
    });

    selectPlayerPopup();

    $('.start_btn').click(function() {
        startTimer();
    });

});
