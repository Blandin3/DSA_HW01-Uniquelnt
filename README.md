# Unique Integer Processor

A Node.js application that processes text files containing numbers and outputs unique, sorted integers. The application can handle both regular number lists and matrix-formatted input files.

## Project Overview

This project provides a solution for processing text files containing numbers and extracting unique integers. It includes features such as:
- Filtering out non-integer values
- Removing duplicates
- Sorting integers in ascending order
- Support for both regular number lists and matrix-formatted inputs

## Installation

1. Clone the repository
2. Ensure you have Node.js installed on your system
3. No additional dependencies are required as the project uses only Node.js built-in modules

## Usage

Run the application using Node.js with input and output directory parameters:

```bash
node solution.js <input_directory> <output_directory>
```

### Input Formats

The application supports two types of input formats:

1. **Regular Number List**
   - One number per line
   - Can include non-integer values (which will be filtered out)
   - Example:
   ```
   5
   14
   58
   -34
   5
   14
   ```

2. **Matrix Format**
   - First line specifies rows (rows=n)
   - Second line specifies columns (cols=m)
   - Subsequent lines contain numbers in (x, y, z) format
   - Example:
   ```
   rows=3
   cols=3
   1, 2, 3
   4, 5, 6
   7, 8, 9
   ```

### Output Format

The output will be written to text files in the specified output directory with the following characteristics:
- One integer per line
- Sorted in ascending order
- No duplicates
- File names will be original_filename_result.txt

## Core Functionality

### Integer Processing
- Filters out non-integer values
- Converts valid string numbers to integers
- Handles negative numbers
- Removes duplicates using Set
- Sorts numbers in ascending order

### File Handling
- Processes all .txt files in the input directory
- Creates output directory if it doesn't exist
- Generates individual result files for each input file
- Handles errors gracefully with appropriate error messages

## Error Handling

The application includes error handling for:
- Missing command line arguments
- Invalid file formats
- File reading/writing errors
- Invalid number formats

## Example

### Input File (sample.txt)
```
5
14
58
-34
"not a number"
5
14
```

### Output File (sample.txt_result.txt)
```
-34
5
14
58
```

## Project Structure

- `solution.js`: Main application file containing all processing logic
- `sample_input_for_students/`: Directory containing sample input files
- `results_for_sample_inputs/`: Directory containing expected output files

## Implementation Details

The project uses several key JavaScript features:
- `Set` for removing duplicates
- `Array.filter()` for removing invalid values
- `Array.sort()` for ordering numbers
- `fs` module for file operations
- `path` module for cross-platform file path handling