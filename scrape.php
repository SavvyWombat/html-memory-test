<?php

define('LOCAL_FILE', getcwd() . '/mdn-reference.html');
define('OUTPUT_FILE', getcwd() . '/mdn-reference.json');

if (!file_exists(LOCAL_FILE)) {
    $cnxn = curl_init();

    curl_setopt($cnxn, CURLOPT_URL, "https://developer.mozilla.org/en-US/docs/Web/HTML/Element");
    curl_setopt($cnxn, CURLOPT_RETURNTRANSFER, 1);

    $html = curl_exec($cnxn);

    curl_close($cnxn);

    $fh = fopen(LOCAL_FILE, 'w');
    fwrite($fh, $html);
    fclose($fh);
}

$dom = new DOMDocument();
$dom->loadHTMLFile(LOCAL_FILE, LIBXML_NOWARNING | LIBXML_NOERROR);

$xpath = new DOMXPath($dom);
$headings = $xpath->query('//article/h2');

$list = [];

foreach ($headings as $heading) {
    $section = [
        'title' => $heading->nodeValue,
        'elements' => []
    ];
    echo "\n" . $heading->nodeValue . "\n";



    $elements = $xpath->query('table/tbody/tr', $heading->nextSibling);

    foreach ($elements as $element) {
        echo '.';

        $section['elements'][] = [
            'name' => $xpath->query('td[1]', $element)[0]->nodeValue,
            'description' => $xpath->query('td[2]', $element)[0]->nodeValue,
        ];
    }

    $list[] = $section;
}

$fh = fopen(OUTPUT_FILE, 'w');
fwrite($fh, json_encode($list));
fclose($fh);

echo "\n\n";