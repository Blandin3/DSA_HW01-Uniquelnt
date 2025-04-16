const fs = require('fs');
const path = require('path');

class UniqueInt {
    constructor() {
        this.currentMatrix = null;
        this.currentMatrixPosition = 0;
    }

    processFile(inputFilePath, outputFilePath) {
        try {
            // Ensure input file exists
            if (!fs.existsSync(inputFilePath)) {
                throw new Error(`Input file ${inputFilePath} does not exist`);
            }

            // Read and process the input file
            const numbers = [];
            const fileStream = fs.createReadStream(inputFilePath);
            const readInterface = require('readline').createInterface({
                input: fileStream,
                crlfDelay: Infinity
            });

            let isMatrix = false;
            let matrixRows = 0;
            let matrixCols = 0;
            let currentRow = 0;

            readInterface.on('line', (line) => {
                if (line.startsWith('rows=')) {
                    isMatrix = true;
                    matrixRows = parseInt(line.split('=')[1]);
                } else if (line.startsWith('cols=')) {
                    matrixCols = parseInt(line.split('=')[1]);
                } else {
                    if (isMatrix) {
                        // Process matrix format
                        if (currentRow < matrixRows) {
                            const rowNumbers = line.split(',').map(n => n.trim());
                            numbers.push(...rowNumbers);
                            currentRow++;
                        }
                    } else {
                        // Process regular number list format
                        numbers.push(line.trim());
                    }
                }
            });

            readInterface.on('close', () => {
                // Filter, remove duplicates, and sort
                const uniqueIntegers = [...new Set(numbers
                    .filter(num => {
                        const parsed = parseInt(num);
                        return !isNaN(parsed) && parsed.toString() === num.trim();
                    })
                    .map(num => parseInt(num)))];
                uniqueIntegers.sort((a, b) => a - b);

                // Create output directory if it doesn't exist
                const outputDir = path.dirname(outputFilePath);
                if (!fs.existsSync(outputDir)) {
                    fs.mkdirSync(outputDir, { recursive: true });
                }

                // Write results to output file
                const outputContent = uniqueIntegers.join('\n');
                fs.writeFileSync(outputFilePath, outputContent);
            });
        } catch (error) {
            throw new Error(`Error processing file: ${error.message}`);
        }
    }

    readNextItemFromFile(inputFileStream) {
        try {
            const chunk = inputFileStream.read();
            if (chunk === null) return null;
            
            const lines = chunk.toString().split('\n');
            for (const line of lines) {
                const trimmed = line.trim();
                if (trimmed) {
                    const parsed = parseInt(trimmed);
                    if (!isNaN(parsed) && parsed.toString() === trimmed) {
                        return parsed;
                    }
                }
            }
            return null;
        } catch (error) {
            throw new Error(`Error reading from file stream: ${error.message}`);
        }
    }
}

module.exports = UniqueInt;