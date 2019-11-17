var AdmZip = require('adm-zip');
 
var zip = new AdmZip();

zip.addLocalFolder('./build')

zip.writeZip('./release.zip')