<?php

use PhpOffice\PhpWord\Autoloader;
use PhpOffice\PhpWord\Settings;
use PhpOffice\PhpWord\IOFactory;

$dir = "../";

if (isset($_GET["filename"])) {
    $filename = $_GET["filename"];
    $filename = $dir.$filename;
    if (file_exists($filename)) {
        $path = pathinfo($filename);
        $pdfFilename = $path["dirname"]."/".$path["filename"].".pdf";
        if (!file_exists($pdfFilename)) {
            exec("OfficeToPDF.exe ".$filename." ".$pdfFilename);
        }
        header("Content-type:application/pdf");
        echo file_get_contents($pdfFilename);
    } else {
        header("HTTP/1.0 404 Not Found");
        die();
    }
} else {
    header("HTTP/1.0 404 Not Found");
    die();
}