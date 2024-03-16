const fs = require('fs');
const path = require('path');

// Function to copy files recursively
function copyFiles(sourceDir, targetDir) {
    fs.readdirSync(sourceDir).forEach(file => {
        const sourceFile = path.join(sourceDir, file);
        const targetFile = path.join(targetDir, file);
        if (fs.lstatSync(sourceFile).isDirectory()) {
            fs.mkdirSync(targetFile);
            copyFiles(sourceFile, targetFile);
        } else {
            fs.copyFileSync(sourceFile, targetFile);
        }
    });
}

// Build function
function build() {
    try {
        // Create dist directory if it doesn't exist
        const distDir = path.join(__dirname, 'dist');
        if (!fs.existsSync(distDir)) {
            fs.mkdirSync(distDir);
        }

        // Copy frontend files to dist
        const frontendDir = path.join(__dirname, 'frontend');
        copyFiles(frontendDir, distDir);

        // Copy backend files to dist
        const backendDir = path.join(__dirname, 'backend');
        copyFiles(backendDir, distDir);

        // Copy node_modules to dist (if it exists)
        const nodeModulesDir = path.join(__dirname, 'node_modules');
        if (fs.existsSync(nodeModulesDir)) {
            const distNodeModulesDir = path.join(distDir, 'node_modules');
            if (!fs.existsSync(distNodeModulesDir)) {
                fs.mkdirSync(distNodeModulesDir);
            }
            copyFiles(nodeModulesDir, distNodeModulesDir);
        }

        console.log('Build completed successfully.');
    } catch (error) {
        console.error('Error during build:', error);
    }
}

// Run the build function
build();
