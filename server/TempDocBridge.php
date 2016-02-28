<?php

use PhpOffice\PhpWord\Autoloader;
use PhpOffice\PhpWord\Settings;
use PhpOffice\PhpWord\IOFactory;

require 'PhpWord/Autoloader.php';
Autoloader::register();
Settings::loadConfig();

class TempDocBridge {
    protected $config;

    public function __construct($config) {
        $this->config = $config;
    }

    protected function transliterate($input){
        $gost = array(
            "�"=>"YE","�"=>"I","�"=>"G","�"=>"i","�"=>"-","�"=>"ye","�"=>"g",
            "�"=>"A","�"=>"B","�"=>"V","�"=>"G","�"=>"D",
            "�"=>"E","�"=>"YO","�"=>"ZH",
            "�"=>"Z","�"=>"I","�"=>"J","�"=>"K","�"=>"L",
            "�"=>"M","�"=>"N","�"=>"O","�"=>"P","�"=>"R",
            "�"=>"S","�"=>"T","�"=>"U","�"=>"F","�"=>"X",
            "�"=>"C","�"=>"CH","�"=>"SH","�"=>"SHH","�"=>"'",
            "�"=>"Y","�"=>"","�"=>"E","�"=>"YU","�"=>"YA",
            "�"=>"a","�"=>"b","�"=>"v","�"=>"g","�"=>"d",
            "�"=>"e","�"=>"yo","�"=>"zh",
            "�"=>"z","�"=>"i","�"=>"j","�"=>"k","�"=>"l",
            "�"=>"m","�"=>"n","�"=>"o","�"=>"p","�"=>"r",
            "�"=>"s","�"=>"t","�"=>"u","�"=>"f","�"=>"x",
            "�"=>"c","�"=>"ch","�"=>"sh","�"=>"shh","�"=>"",
            "�"=>"y","�"=>"","�"=>"e","�"=>"yu","�"=>"ya",
            " "=>"_","�"=>"_",","=>"_","!"=>"_","@"=>"_",
            "#"=>"-","$"=>"","%"=>"","^"=>"","&"=>"","*"=>"",
            "("=>"",")"=>"","+"=>"","="=>"",";"=>"",":"=>"",
            "'"=>"","\""=>"","~"=>"","`"=>"","?"=>"","/"=>"",
            "\\"=>"","["=>"","]"=>"","{"=>"","}"=>"","|"=>"", " "=>"_"
        );

        return strtr($input, $gost);
    }

    public function Get() {
        $entries = Array();
        $path = $this->config->tmpDir;
        $handle = opendir($path);
        while (false !== ($entry = readdir($handle))) {
            if ($entry === "." || $entry === "..") {
                continue;
            }
            $newName = $this->transliterate($entry);
            rename($path."/".$entry, $path."/".$newName);
            $entries[] = array("name" => $newName);
        }
        closedir($handle);
        return $entries;
    }

    public function Set() {}
    public function Delete() {}
}

?>