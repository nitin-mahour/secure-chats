<?php

class Database{

    private $db_host = "";
    private $db_name = "";
    private $db_user = "";
    private $db_password = "";
    private $connection;

    public function getConnection(){

        $this->connection = new mysqli($this->db_host ,$this->db_user, $this->db_password, $this->db_name);

        if ($this->connection->connect_error) {
            echo "CONNECTION ERROR: ".$this->connection->connect_error;
            die();
        }

        return $this->connection;
    }
}
?>
