<?php

require_once("./RedBean/rb.php");
require_once("./User.php");

class OneLibConfig {
    protected $dbhost = "localhost";
    protected $dbname = "onelib";
    protected $dbuser = "root";
    protected $dbpass = "";
    public $tmpDir = "../tmp/";
    public $docsDir = "../documents/";
    public $fenom;
    public $user = null;
    protected $templatesDir = "../templates/";
    protected $templatesCacheDir = "../templates/cache/";

    function __construct() {
        R::setup('mysql:host='.$this->dbhost.';dbname='.$this->dbname, $this->dbuser, $this->dbpass);
        $this->user = new User();
    }
}

?>