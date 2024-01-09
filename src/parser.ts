// Author: icedoesjs
// Date: 1/9/2024
// Version: 1.7
const { readFileSync } = require('fs');
const { resolve } = require('path');
const INDENT = /^(?:( )+|\t+)/;
const FLOAT = /^[0-9]+(\.)?[0-9]$/;


/**
 * This interface is the basic definition of all variables
 * @author icedoeSJs 
 * @private
 */
interface Variable {
    name: string;
    value: any;
    isFile?: string | boolean;
}

/**
 * An array of all variables (variable pool)
 * @name VariablePool
 * @private 
 * @author icedoeSJs
 */
let VariablePool: { name: string, value: any, isFile?: string | boolean }[] = [];

/**
* The base SJ parser class
* @version 1.6.1
* @author icedoeSJs 
* @description SJ (Simplified JSON) allows you to create readable configs and convert them to JSON when needed
* @property {boolean} quietMode A boolean value indicating if quiet mode is enabled (default: false)
*/
class SJ {
    private quietMode: boolean;
    constructor(quietMode = false) {
        this.quietMode = quietMode;
    }


    /**
     * Parses a SJ (Simplifed JSON) file to JSON (Javascript Object Notation)
     * @param {string} filePath The file path in which the SJ file is located
     * @param {string} configPath? The file path where SJ should search for variable requirements
     * @returns {object} The provided SJ file converted to JSON
     * @author icedoejs
     * @public
     * @todo Nested Objects
     * @todo Array of Objects
     */
    public parse(filePath: string, configPath = ""): string {
        // Make sure our file is a SJ file
        if (filePath.split(".").reverse()[0] !== "sj") throw new Error('The provided file MUST be a SJ file.');
        let parsedSJ: string = "";
        let contents = readFileSync(filePath, { encoding: "utf-8" }).toString().split("\n");
        let i = 1; // The current line we are on
        parsedSJ += "{\n" // Insert opening JSON bracket
        contents.forEach(async (line: string) => {
            if (line === "\r") {
                if (!this.quietMode) console.log(`[LOG] line ${i} contained empty space, skipped`);
                return i++;
            };

            // Ignore comments
            if (line.trim().charAt(0) == "!" && line.charAt(1) == "!") {
                return i++;
            }

            // Jump over indented lines (section handler will do that)
            if (INDENT.test(line)) {
                return i++;
            }

            if (line.trim().charAt(0) === "*") {
                // Variable definitions (add to variable pool)
                if (line.split("as")[1].trim().includes("require")) {
                    // Variable definition includes a require
                    let file_name:string = line.split("require")[1].replace("(", "").replace(")", "").replace("'", "").replace("'", "");
                    let file_ending:string = file_name.trim().split(".")[1].toLowerCase();
                    let file_content = this.parseFile(file_name, configPath);
                    if (file_ending === "txt") {
                    // Read file and extract variable definition (txt)
                        let var_name = line.split("as")[0].trim().replace("*define", "").trim();
                        this.createVariable(var_name, file_content, true);
                        if (!this.quietMode) console.log(`[LOG] Line ${i} contained variable definition for ${var_name}, extracted from file and added to variable pool.`);
                        return i++;
                    } else if (file_ending === "js") {
                        // Read file, find variable and extract the definition (js)
                        let var_name = line.split("*define")[1].split("as")[0].trim()
                        if (!file_content.indexOf(var_name)) {
                            this.createVariable(var_name, undefined, true);
                            if (!this.quietMode) console.log(`[LOG] Line ${i} declared ${var_name}, no value was found in the file. Variable has been set to undefined.`)
                        }
                        // Find where variable is first declared
                        let var_value = file_content.substring(file_content.indexOf(var_name) + 1).split("\n")[0].split("=")[1].trim()
                        // If it is a string (contains quotation characters), remove them and let the system handle type detection.
                        let str_symbols = ['"', "'", "`"];
                        if (str_symbols.includes(var_value.charAt(0)) && str_symbols.includes(var_value.charAt(var_value.length -1))) {
                            // Remove quotes
                            var_value = var_value.substr(1, var_value.length -2);
                        }
                        this.createVariable(var_name, var_value, true);
                        if (!this.quietMode) console.log(`[LOG] Line ${i} declared ${var_name}, a value was extracted and added to the variable pool. `)
                        return i++;
                    } else {
                        throw new Error(`${file_name} is a ${file_ending} file, which is not supported.`)
                    }
                } else if (!line.split("as")[1].trim().includes("require")) {
                    let var_name = line.split("as")[0].trim().replace("*define", "").trim();
                    let var_val = line.split("as")[1].trim();
                    // Add variable definition to pool
                    this.createVariable(var_name, var_val);
                    if (!this.quietMode) console.log(`[LOG] Line ${i} contained a variable definition for ${var_name}, variable added to variable pool.`);
                    return i++;
                }
            }
            // Regular definitions 
            if (!INDENT.test(contents[i]) && line.includes("=")) {
                // Does line contain variable?
                if (line.split("=")[1].trim().charAt(0) == "*") {
                    let key = line.split("=")[0].trim();
                    let var_used = line.split("=")[1].trim().replace(/\*/g, "");
                    // Pull the desired variable from Variable Pool
                    let var_value = this.getVariable(var_used);
                    parsedSJ += `"${key}": ${this.getType(var_value)},\n`;
                    return i++;
                } else {
                    let key = line.split("=")[0].trim();
                    let value = line.split("=")[1].trim();
                    parsedSJ += `"${key}": ${this.getType(value)},\n`;
                    return i++;
                }
            }
            // Section definitions
            if (line.trim().slice(-1) === ":") {
                let jump = i;
                let section_name = line.trim().replace(":", "");
                let section = [];
                // Capture our section, stop when indenting stops
                while (INDENT.test(contents[jump])) {
                    section.push({ "key": contents[jump].split("=")[0].trim(), "value": contents[jump].split("=")[1].trim() });
                    jump++;
                }
                if (!this.quietMode) console.log(`[LOG] Loop captured section "${section_name}"`);
                parsedSJ += `"${section_name}": {\n`;
                let no_comma = 1;
                section.forEach(kv => {
                    if (no_comma == section.length) {
                        parsedSJ += `  "${kv.key}": ${this.getType(kv.value)}\n`;
                    } else {
                        parsedSJ += `  "${kv.key}": ${this.getType(kv.value)},\n`;
                        no_comma++;
                    }
                });
                parsedSJ += "},\n";
                return i++;
            }
        });
        parsedSJ += "}";
        // Remove trailing comma
        let trailing_comma = parsedSJ.lastIndexOf(",");
        parsedSJ = parsedSJ.slice(0, trailing_comma) + parsedSJ.slice(trailing_comma + 1);
        if (!this.quietMode) console.log(`[LOG] All done, ended on line ${i - 1}.`);
        return JSON.parse(parsedSJ);
    }


    /**
     * Get the type of a string (array, int, float, boolean)
     * @param {any} value The string of the type we need
     * @private 
     * @returns {string} The inputted value converted to its proper type (array, int, float, boolean)
     */
    private getType(value: any): any {
        switch(value) {
            // Boolean checking
            case value.toLowerCase() == "yes":
                return true;

            case value.toLowerCase() == "no":
                return false;

            // End boolean checking

            // Null checking
            case value.toLowerCase() == "nill":
                return null;

            // Array checking
            case value.trim().charAt(0) === "[" && value.trim().charAt(value.length - 1) === "]":
                let arr_values = value.replace("[", "").replace("]", "").split(",");
                arr_values.forEach((v: string) => {
                    let item_index = arr_values.indexOf(v);
                    if (v.trim() === "none") {
                        arr_values.splice(item_index, 1);
                    } else {
                        arr_values[item_index] = v.trim();
                    }
                });
                return JSON.stringify(arr_values);

            // String checking
            case value.match(/^[0-9]+$/) == null:
                return `"${value}"`;

            // Float checking
            case FLOAT.test(value):
                return value;
            
            // Int checking
            case value.match(/^[0-9]+$/) !== null:
                return value;

            // Default to string if no type is found
            default:
                return `"${value}"`;
        }
    }

    /**
     * Read a file and return the contents (used for variables)
     * @param {string} fileName The name of the file to be parsed
     * @private 
     * @returns {string} The file contents
     */
    private parseFile(fileName: string, configPath: string): any {
        let file_ending = fileName.trim().split(".")[1];
        if (file_ending !== "txt" && file_ending !== "js") throw new Error(`${fileName} is not supported for variable extraction.`);
        let file_value;
        try {
            file_value = readFileSync(resolve(process.cwd() + "\\" + configPath + "\\" + fileName.trim()), "utf-8");
        } catch (err) {
            throw new  Error(`Unable to locate or open ${fileName.trim()}.`);
        }
        return file_value.trim();
    }

    /**
     * Creates a variable in the variable pool 
     * @param {string} name The variables name
     * @param {any} value The variables value
     * @private 
     * @returns {void}
     */
    private createVariable(name: string, value: any, isFile = false): void {
        let newVar: Variable = { name: name, value: value, isFile: isFile };
        VariablePool.push(newVar);
    }

    /**
     * Get a variables value from the variable pool
     * @private
     * @returns {string} The definition of the desired variable in the pool
     */
    private getVariable(name: string): any {
        let var_value = VariablePool.filter(v => v.name === name);
        if (!var_value.length) {
            return "";
        } else {
            return var_value[0].value;
        }
    }
}

module.exports = SJ;
