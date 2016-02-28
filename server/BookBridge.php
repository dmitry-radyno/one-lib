<?php

class BookBridge {
    protected $config;

    public function __construct($config) {
        $this->config = $config;
    }

    public function Get() {
        if (isset($_GET["id"])) {
            $books = Array(R::load('book', $_GET["id"]));
        } else {
            $books = R::findAll('book');
        }
        $newBooks = array();
        foreach($books as $book) {
            $newBooks[] = array(
                "id" => $book->id,
                "name" => $book->name,
                "file" => $book->file,
                "author" => $book->author,
                "year" => $book->year,
                "production" => $book->production,
                "keywords" => $book->keywords,
                "type" => $book->type
            );
        }
        return $newBooks;
    }

    public function Set() {
        if (isset($_GET["id"])) {
            $book = R::load('book', $_GET['id']);
            if (!$book) {
                throw new Exception("Unknown book");
            }
        } else {
            $book = R::dispense('book');
        }

        $bookType = $_GET["type"] === "book" ? "book" : "material";
        if ($bookType === "book") {
            $book->name = $_GET["name"];
            $book->author = $_GET["author"];
            $book->year = $_GET["year"];
            $book->keywords = $_GET["keywords"];
        } else {
            $book->name = $_GET["name"];
            $book->author = $_GET["author"];
            $book->year = $_GET["year"];
            $book->keywords = $_GET["specs"];
        }
        $book->type = $bookType;
        $book->realFileName = $_GET["file"];
        $path = pathinfo($book->realFileName);
        $book->file = md5($book->realFileName).".".$path["extension"];

        $tempPath = $this->config->tmpDir.$book->realFileName;
        $permPath = $this->config->docsDir.$book->file;
        $pdfPath = $this->config->tmpDir.$path["filename"].".pdf";

        if (file_exists($tempPath)) {
            rename($tempPath, $permPath);
            if (file_exists($pdfPath)) {
                unlink($pdfPath);
            }

            $id = R::store( $book );
            return Array("id" => $id);
        } else {
            return Array("error" => "Unknown file");
        }
    }
}

?>