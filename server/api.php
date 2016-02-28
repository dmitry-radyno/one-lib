<?php

require_once("config.php");
$config = new OneLibConfig();

// TODO: check user permissions
if (!isset($_GET["request"])) {
    die();
}

$entityMethod = null;
$entity = null;
$method = null;
$bridge = null;
$result = null;
$request = $_GET["request"];

//echo "<pre>";
//print_r($_GET);
//echo "</pre>";

if (strpos($request, "?") === false) {
    $entityMethod = $request;
} else {
    list($entityMethod) = explode("?", $request, 1);
}

if (strpos($entityMethod, "/") === false) {
    $entity = $entityMethod;
    $method = "get";
} else {
    list($entity, $method) = explode('/', $entityMethod, 2);
}

if ($entity === "book") {
    require_once("BookBridge.php");
    $bridge = new BookBridge($config);
} else if ($entity === "user") {
    require_once("UserBridge.php");
    $bridge = new UserBridge($config);
} else if ($entity === "tempdoc") {
    require_once("TempDocBridge.php");
    $bridge = new TempDocBridge($config);
} else if ($entity === "download") {
    require_once("DownloadBridge.php");
    $bridge = new DownloadBridge($config);
} else {
    throw new Exception("Unsupported entity type");
}

switch ($method) {
    case "get":
        $result = $bridge->Get();
        break;
    case "set":
        $result = $bridge->Set();
        break;
    case "delete":
        $result = $bridge->Delete();
        break;
    default:
        throw new Exception("Unsupported method");
}

header("Content-type: text/json");
echo json_encode($result);


?>