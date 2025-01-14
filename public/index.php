<?php

function dd($value)
{
  echo '<pre>';
  var_dump($value);
  echo '</pre>';
  die();
}

function serveHTML($file)
{
  header('Content-Type: text/html');
  readfile($file);
}

function serveJSON($data)
{
  header('Content-Type: application/json');
  echo json_encode($data);
}

$uri = parse_url($_SERVER['REQUEST_URI'])['path'];

$route = [
  '/' => 'index.html',
  '/about' => 'index.html',
  '/contact' => 'index.html'
];

$api = [
  '/api/home' => 'Home',
  '/api/about' => 'About',
  '/api/contact' => 'Contact'
];

if (key_exists($uri, $route)) {
  serveHTML($route[$uri]);
} elseif (key_exists($uri, $api)) {
  serveJSON([
    'header' => $api[$uri]
  ]);
}
