function denied() {
    alert("Permission Denied");
}

function allow(message,executable) {
    alert(message);
    exec(executable, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
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