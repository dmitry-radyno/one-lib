<?php

class UserBridge {
    protected $config;

    public function __construct($config) {
        $this->config = $config;
    }

    public function Get() {
        $users = R::findAll('user');
        $newUsers = array();
        foreach($users as $user) {
            $newUsers[] = array(
                "id" => $user->id,
                "name" => $user->name,
                "surname" => $user->surname,
                "email" => $user->email,
                "isAdmin" => $user->isAdmin === '1' ? true : false,
                "isTeacher" => $user->isTeacher,
                "group" => $user->group
            );
        }
        return $newUsers;
    }

    public function Set() {
        if (isset($_GET["id"])) {
            $user = R::load('user', $_GET['id']);
            if (!$user) {
                throw new Exception("Unknown user");
            }
        } else {
            $user = R::dispense('user');
        }

        // validate fields: email, name, surname

        $user->email = $_GET["email"];
        $user->name = $_GET["name"];
        $user->surname = $_GET["surname"];
        $user->isAdmin = $_GET["isAdmin"];
        $id = R::store( $user );
        return Array("id" => $id);
    }

    public function Delete() {
        if (isset($_GET["id"])) {
            $user = R::load('user', $_GET['id']);
            if (!$user) {
                throw new Exception("Unknown user");
            } else {
                R::trash($user);
            }
        } else {
            throw new Exception("Unknown user");
        }
        return Array();
    }

}

?>