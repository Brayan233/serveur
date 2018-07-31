<?php


$headers = array();
array_push($headers,'Ocp-Apim-Subscription-Key:0e7e5f6249c24782bfc41b5d55c4c30f');

$ch = curl_init();

$url = "https://t2b-test.azure-api.net/api-test/api/persons";
curl_setopt($ch, CURLOPT_URL,$url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
$result = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
}
curl_close ($ch);

/*On a une erreur alors on la leve*/
if($result === false)
{
	trigger_error('Erreur curl : '.curl_error($c),E_USER_WARNING);
}
/*Si tout c'est bien passé on affiche le contenu de la requête*/
else
{

    $output_decode = json_decode($result);
    var_dump($output_decode);



   
	
}
/*On ferme la ressource*/
curl_close($c);
