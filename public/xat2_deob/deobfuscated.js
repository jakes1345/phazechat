
function loadKiss(action, data1, data2, data3, data4, data5) {
    let isBlast = action && ('blast' == action.substr(0, 5)),
        containerId = isBlast ? getCorrectId() : 'kissContainer',
        container = document.getElementById(containerId);

    if (container || (container = _Activity.instance.Window.document.getElementById(containerId)), container = clearDiv(0, container), !container) return;

    let zIndex = _Activity.instance.IsClassic ? 31 : 0;
    container.style.display = '';
    container.style.zIndex = isBlast ? zIndex : 100000;
    
    var pos = posKiss(container);
    if (!data2) data2 = void(0);

    var kissFrame = document.createElement('iframe');
    kissFrame.id = 'kissFrame';
    kissFrame.className = 'kissFrame';
    kissFrame.style.border = '0';
    kissFrame.width = _Activity.instance.IsClassic ? pos[0] : (pos[0] + 100);
    kissFrame.height = pos[1];
    kissFrame.style.display = 'none';
    
    container.appendChild(kissFrame);
    
    window.addEventListener('message', onMessage, false);
    
    kissFrame.onload = function() {
        var messageData = {
            'action': action,
            'data1': data1,
            'data2': data2,
            'domain': xatdomain,
            'data4': data4,
            'data5': data5
        };
        kissFrame.style.display = 'block';
        kissFrame.contentWindow.postMessage(JSON.stringify(messageData), '*');
    };
    
    kissFrame.src = _Activity.instance.IsClassic && isBlast ? 'kiss.html' : 'www/kiss.html';
    return container;
}

function onMessage(event) {
    var data = JSON.parse(event.data);
    switch (data.action) {
        case 'kissLoaded':
            break;
        case 'kissDone':
        case 'kissClick':
            clearDiv(0, getCorrectId()).style.display = 'none';
    }
}

function posKiss(element) {
    var winWidth = window.innerWidth,
        winHeight = window.innerHeight,
        scaleW, scaleH, posX, posY;

    if ((winWidth / winHeight) > (900 / 600)) {
        posY = 0;
        scaleH = winHeight / 600;
        scaleW = scaleH;
        posX = (winWidth - (900 * scaleW)) / 2;
        if ((winWidth / winHeight) <= 1.5005) {
            posX = 0;
            scaleW = winWidth / 900;
        }
    } else {
        scaleW = winWidth / 900;
        scaleH = scaleW;
        posX = 0;
        posY = (winHeight - (600 * scaleH)) / 2;
    }
    
    posX = xInt(posX);
    posY = xInt(posY);
    var targetHeight = xInt(600 * scaleH);
    var targetWidth = xInt(900 * scaleW);

    element.style.left = posX + 'px';
    element.style.top = posY + 'px';
    element.style.width = targetWidth + 'px';
    element.style.height = targetHeight + 'px';
    
    return [targetWidth, targetHeight];
}

function getCorrectId() {
    return !_Activity.instance.IsClassic ? 'kissContainer' : 'kissContainerOld';
}

if (typeof _Activity === 'undefined') {
    _Activity = (typeof parent._Activity !== 'undefined') ? parent._Activity : 
                (typeof parent.parent._Activity !== 'undefined') ? parent.parent._Activity : 
                (typeof parent.parent.parent._Activity !== 'undefined') ? parent.parent.parent._Activity : {};
}