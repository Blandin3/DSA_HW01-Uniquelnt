const fs = require('fs');
const path = require('path');

function processFile(inputFile) {
    // Read the input file
    const content = fs.readFileSync(inputFile, 'utf8');
    const lines = content.split('\n').filter(line => line.trim());
    
    // Handle special case for matrix format files
    if (lines[0].startsWith('rows=')) {
        const numbers = new Set();
        // Skip the first two lines (rows and cols)
        for (let i = 2; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line) {
                // Extract numbers from format (x, y, z)
                const matches = line.match(/-?\d+/g);
                if (matches) {
                    matches.forEach(num => numbers.add(parseInt(num)));
                }
            }
        }
        return Array.from(numbers);
    }
    
    // Handle regular number list files
    const numbers = lines
        .map(line => {
            // Try to parse each line as a number
            const num = parseFloat(line.trim());
            return Number.isInteger(num) ? num : null;
        })
        .filter(num => num !== null); // Remove non-integer values
    
    // Remove duplicates and sort
    const uniqueNumbers = Array.from(new Set(numbers));
    return uniqueNumbers.sort((a, b) => a - b);
}

function writeOutput(numbers, outputFile) {
    const output = numbers.join('\n');
    fs.writeFileSync(outputFile, output);
}

function processDirectory(inputDir, outputDir) {
    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Process all txt files in the input directory
    const files = fs.readdirSync(inputDir)
        .filter(file => file.endsWith('.txt'));

    files.forEach(file => {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, `${file}_result.txt`);
        
        try {
            const numbers = processFile(inputPath);
            writeOutput(numbers, outputPath);
            console.log(`Processed ${file} successfully`);
        } catch (error) {
            console.error(`Error processing ${file}:`, error);
        }
    });
}

// Get command line arguments
const inputDir = process.argv[2];
const outputDir = process.argv[3];

if (!inputDir || !outputDir) {
    console.error('Usage: node solution.js <input_directory> <output_directory>');
    process.exit(1);
}

processDirectory(inputDir, outputDir);