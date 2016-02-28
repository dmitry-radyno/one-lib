$realBookName = $bookName." - ".$bookAuthor.".".$ext;

if (file_exists($file)) {
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename='.$realBookName);
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($autoFileName));
    readfile($autoFileName);
    exit;
}