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
            "ª"=>"YE","²"=>"I",""=>"G","³"=>"i","¹"=>"-","º"=>"ye","ƒ"=>"g",
            "À"=>"A","Á"=>"B","Â"=>"V","Ã"=>"G","Ä"=>"D",
            "Å"=>"E","¨"=>"YO","Æ"=>"ZH",
            "Ç"=>"Z","È"=>"I","É"=>"J","Ê"=>"K","Ë"=>"L",
            "Ì"=>"M","Í"=>"N","Î"=>"O","Ï"=>"P","Ð"=>"R",
            "Ñ"=>"S","Ò"=>"T","Ó"=>"U","Ô"=>"F","Õ"=>"X",
            "Ö"=>"C","×"=>"CH","Ø"=>"SH","Ù"=>"SHH","Ú"=>"'",
            "Û"=>"Y","Ü"=>"","Ý"=>"E","Þ"=>"YU","ß"=>"YA",
            "à"=>"a","á"=>"b","â"=>"v","ã"=>"g","ä"=>"d",
            "å"=>"e","¸"=>"yo","æ"=>"zh",
            "ç"=>"z","è"=>"i","é"=>"j","ê"=>"k","ë"=>"l",
            "ì"=>"m","í"=>"n","î"=>"o","ï"=>"p","ð"=>"r",
            "ñ"=>"s","ò"=>"t","ó"=>"u","ô"=>"f","õ"=>"x",
            "ö"=>"c","÷"=>"ch","ø"=>"sh","ù"=>"shh","ú"=>"",
            "û"=>"y","ü"=>"","ý"=>"e","þ"=>"yu","ÿ"=>"ya",
            " "=>"_","—"=>"_",","=>"_","!"=>"_","@"=>"_",
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