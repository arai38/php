<?php
// エラーレポートを有効にする
error_reporting(E_ALL);
ini_set('display_errors', 1);

// スクリプトのディレクトリを基準にする
$directory = __DIR__ . '/uploads'; // 絶対パスに変更

// ディレクトリの存在確認
if (!is_dir($directory)) {
    die('指定されたディレクトリが存在しません。');
}

// ディレクトリ内のファイルを取得
$files = scandir($directory);

// 画像ファイルの拡張子
$imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];

// 画像ファイルのリストを初期化
$imageList = [];

foreach ($files as $file) {
    // 特殊ファイル（. と ..）はスキップ
    if ($file === '.' || $file === '..') {
        continue;
    }

    $filePath = $directory . '/' . $file;

    // ファイルが画像であるかどうかをチェック
    if (is_file($filePath) && in_array(strtolower(pathinfo($file, PATHINFO_EXTENSION)), $imageExtensions)) {
        // URLエンコードすることで、ブラウザで正しく表示されるようにする
        $imageList[] = 'uploads/' . $file; // 相対パスとして出力する
    }
}

// 画像リストをJSON形式で出力
header('Content-Type: application/json');
echo json_encode($imageList);
?>
