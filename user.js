function denied() {
    alert("Permission Denied");
}

function launchNotepad()  {
    alert("Launching Notepad")
    $.post('http://localhost:7000/launch', {
        'notepad':true
    });

    return;
}

function launchSnip() {
    denied();
    return;
}

function launchIE() {
    denied();
    return;
}

function launchPaint() {
    denied();
    return;
}


document.getElementById('snip').onclick = launchSnip;

document.getElementById('ie').onclick = launchIE;

document.getElementById('paint').onclick = launchPaint;

document.getElementById('note').onclick = launchNotepad;