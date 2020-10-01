const { exec } = require('child_process');
module.exports = function(executable,message) {
    exec(executable, (error, stdout, stderr) => {
        if (error) {
            return false;
        }
        if (stderr) {
            return false
        }
        return true;
    });
}
