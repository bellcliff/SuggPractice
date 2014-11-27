<?php 
if (isset($_GET['key'])){
    $resArr = array('key'=>$_GET['key'], 'sugg'=>array());
    foreach(range(1, 10) as $idx){
        array_push($resArr['sugg'], $_GET['key'].$idx);
    }
    echo json_encode($resArr);
}
