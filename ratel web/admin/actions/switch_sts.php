<?PHP
$url = 'https://portal.ratelplus.net';
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_NOBODY, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_exec($ch);
    $retcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    if (200==$retcode) {
        // All's well
        echo "VOS3000 Web V3.0: <span  class='badge rounded-pill bg-success' style='cursor: pointer;color:white'>Online</span></div>";
    } else {
        // not so much
        echo "VOS3000 Web V3.0: <span  class='badge rounded-pill bg-danger'style='cursor: pointer;color:white'>Offline</span></div>";
       // mail("munzali@ratelplus.net","Switch Status","Response: Offline");
    }
    
    