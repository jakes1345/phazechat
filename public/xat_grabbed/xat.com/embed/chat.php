<!doctype html>
<html style="height: 100%">
<head>
</style>
<script>
var xConfig={origin:"https://xat.com"};
window.addEventListener('message', onMessage, false);
function onMessage(e) // 
{
  if(e.origin !== xConfig.origin)
    return;

  var Obj = JSON.parse(e.data);

  if(Obj.tobox)
  {
    window.box.postMessage(e.data, xConfig.origin);
    return;
  }

  if(parent) 
    parent.postMessage(e.data, xConfig.origin);
}
</script>
</head>
<body style="margin: 0px; height: 100%">
<iframe name="box" src='https://xat.com/content/web/R00241/box/embed.html' width='100%' height='100%' frameborder='0' scrolling='no'></iframe>
</body>
</html>
