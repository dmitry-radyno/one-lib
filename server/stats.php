<?php

require_once("config.php");
$config = new OneLibConfig();

$materialsCount = R::getCell('SELECT count(id) as count FROM book WHERE type=\'material\' GROUP BY type');
$booksCount = R::getCell('SELECT count(id) as count FROM book WHERE type=\'book\' GROUP BY type');

$renderOptions = Array(
    "materialsCount" => $materialsCount,
    "booksCount" => $booksCount,
    "totalCount" => $materialsCount + $booksCount
);
$config->fenom->display("stats.tpl", $renderOptions);

?>