function launchNotepad()  {
    alert("Launching Notepad")
    $.post('http://localhost:7000/launch', {
        'notepad':true
    });

    return;
}

function launchSnip() {
    alert("Launching Snipping Tool")
    $.post('http://localhost:7000/launch', {
        'snipping':true
    });

    return;
}

function launchIE() {
    alert("Launching IE")
    $.post('http://localhost:7000/launch', {
        'ie':true
    });

    return;
}

function launchPaint() {
    alert("Launching MSPaint")
    $.post('http://localhost:7000/launch', {
        'paint':true
    });

    return;
}


document.getElementById('snip').onclick = launchSnip;

document.getElementById('ie').onclick = launchIE;

document.getElementById('paint').onclick = launchPaint;

document.getElementById('note').onclick = launchNotepad;