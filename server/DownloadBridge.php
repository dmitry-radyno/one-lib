<?php

use PhpOffice\PhpWord\Autoloader;
use PhpOffice\PhpWord\Settings;
use PhpOffice\PhpWord\IOFactory;

require 'PhpWord/Autoloader.php';
Autoloader::register();
Settings::loadConfig();

class DownloadBridge {
    protected $config;

    public function __construct($config) {
        $this->config = $config;
    }

    public function Get() {
        if (isset($_GET["id"])) {
            $id = $_GET["id"];
            $book = R::load('book', $_GET['id']);
            if (!$book) {
                throw new Exception("Unknown book");
            }
            if ($book->type === "material") {
                $filename = $this->config->docsDir.$book->file;
                $prettyFileName = $book->author." - ".$book->name;
                header("Content-type:application/pdf");
                header("Content-Disposition:attachment;filename='".$prettyFileName.".pdf'");
                echo file_get_contents($filename);
                die();
            } else {
                if (isset($_GET["pages"])) {
                    $pages = $_GET["pages"];
                    $pages = explode(",", $pages);

                    if (count($pages) < 1 || count($pages) > 10) {
                        return Array("Invalid request");
                    } else {
                        $filename = $this->config->docsDir.$book->file;
                        $filename = str_replace(".doc", ".pdf", $filename);
                        $tempFileName = $this->config->docsDir.uniqid(rand(), true) . '.pdf';

                        exec("pdftk ".$filename." cat ".implode(" ", $pages)." output ".$tempFileName);

                        $prettyFileName = $book->author." - ".$book->name." (".implode(", ", $pages).")";
                        header("Content-type:application/pdf");
                        header("Content-Disposition:attachment;filename='".$prettyFileName.".pdf'");

                        echo file_get_contents($tempFileName);
                        unlink($tempFileName);
                        die();
                    }
                } else {
                    return Array("Invalid request");
                }
            }
        }
        return Array("Invalid request");
    }

    public function Set() {}
    public function Delete() {}
}

?>