<?php

include('./dicts.php');

class Lanna_words extends BaseDicts {
    
    public function getRandomWords() {
        return array_rand($this->words);
    }

    public function getWordDefinition($wordID) {
        return $this->words[$wordID];
    }
    
}


/* Start */

$wordDatas = new Lanna_words();

switch ($_GET['params']) {
    case "random":
        header('Content-Type: application/json');
        echo json_encode($wordDatas->getWordDefinition($wordDatas->getRandomWords()));
        break;
    
    default:
        # code...
        break;
}
