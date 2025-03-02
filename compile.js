const fs = require('fs');
const path = require('path');
const pug = require('pug'); // The only external dependency allowed

const SRC_DIR = path.join(__dirname, 'src');
const DIST_DIR = path.join(__dirname, 'dist');

// Ensure the dist directory exists
if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
}

// Read all files in src directory
fs.readdir(SRC_DIR, (err, files) => {
    if (err) {
        console.error('Error reading src directory:', err);
        return;
    }

    // Filter for .pug files
    files.filter(file => path.extname(file) === '.pug').forEach(file => {
        const filePath = path.join(SRC_DIR, file);
        const outputFilePath = path.join(DIST_DIR, path.basename(file, '.pug') + '.html');

        try {
            // Compile Pug to HTML
            const compiledHTML = pug.renderFile(filePath);

            // Write the compiled HTML to dist directory
            fs.writeFileSync(outputFilePath, compiledHTML, 'utf8');
            console.log(`Compiled ${file} -> ${outputFilePath}`);
        } catch (error) {
            console.error(`Error compiling ${file}:`, error);
        }
    });
});
