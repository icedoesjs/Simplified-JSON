var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Author: icedoesjs
// Date: 1/9/2024
// Version: 1.7
var readFileSync = require('fs').readFileSync;
var resolve = require('path').resolve;
var INDENT = /^(?:( )+|\t+)/;
var FLOAT = /^[0-9]+(\.)?[0-9]$/;
/**
 * An array of all variables (variable pool)
 * @name VariablePool
 * @private
 * @author icedoeSJs
 */
var VariablePool = [];
/**
* The base SJ parser class
* @version 1.6.1
* @author icedoeSJs
* @description SJ (Simplified JSON) allows you to create readable configs and convert them to JSON when needed
* @property {boolean} quietMode A boolean value indicating if quiet mode is enabled (default: false)
*/
var SJ = /** @class */ (function () {
    function SJ(quietMode) {
        if (quietMode === void 0) { quietMode = false; }
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
    SJ.prototype.parse = function (filePath, configPath) {
        var _this = this;
        if (configPath === void 0) { configPath = ""; }
        // Make sure our file is a SJ file
        if (filePath.split(".").reverse()[0] !== "sj")
            throw new Error('The provided file MUST be a SJ file.');
        var parsedSJ = "";
        var contents = readFileSync(filePath, { encoding: "utf-8" }).toString().split("\n");
        var i = 1; // The current line we are on
        parsedSJ += "{\n"; // Insert opening JSON bracket
        contents.forEach(function (line) { return __awaiter(_this, void 0, void 0, function () {
            var file_name, file_ending, file_content, var_name, var_name, var_value, str_symbols, var_name, var_val, key, var_used, var_value, key, value, jump, section_name, section_1, no_comma_1;
            var _this = this;
            return __generator(this, function (_a) {
                if (line === "\r") {
                    if (!this.quietMode)
                        console.log("[LOG] line ".concat(i, " contained empty space, skipped"));
                    return [2 /*return*/, i++];
                }
                ;
                // Ignore comments
                if (line.trim().charAt(0) == "!" && line.charAt(1) == "!") {
                    return [2 /*return*/, i++];
                }
                // Jump over indented lines (section handler will do that)
                if (INDENT.test(line)) {
                    return [2 /*return*/, i++];
                }
                if (line.trim().charAt(0) === "*") {
                    // Variable definitions (add to variable pool)
                    if (line.split("as")[1].trim().includes("require")) {
                        file_name = line.split("require")[1].replace("(", "").replace(")", "").replace("'", "").replace("'", "");
                        file_ending = file_name.trim().split(".")[1].toLowerCase();
                        file_content = this.parseFile(file_name, configPath);
                        if (file_ending === "txt") {
                            var_name = line.split("as")[0].trim().replace("*define", "").trim();
                            this.createVariable(var_name, file_content, true);
                            if (!this.quietMode)
                                console.log("[LOG] Line ".concat(i, " contained variable definition for ").concat(var_name, ", extracted from file and added to variable pool."));
                            return [2 /*return*/, i++];
                        }
                        else if (file_ending === "js") {
                            var_name = line.split("*define")[1].split("as")[0].trim();
                            if (!file_content.indexOf(var_name)) {
                                this.createVariable(var_name, undefined, true);
                                if (!this.quietMode)
                                    console.log("[LOG] Line ".concat(i, " declared ").concat(var_name, ", no value was found in the file. Variable has been set to undefined."));
                            }
                            var_value = file_content.substring(file_content.indexOf(var_name) + 1).split("\n")[0].split("=")[1].trim();
                            str_symbols = ['"', "'", "`"];
                            if (str_symbols.includes(var_value.charAt(0)) && str_symbols.includes(var_value.charAt(var_value.length - 1))) {
                                // Remove quotes
                                var_value = var_value.substr(1, var_value.length - 2);
                            }
                            this.createVariable(var_name, var_value, true);
                            if (!this.quietMode)
                                console.log("[LOG] Line ".concat(i, " declared ").concat(var_name, ", a value was extracted and added to the variable pool. "));
                            return [2 /*return*/, i++];
                        }
                        else {
                            throw new Error("".concat(file_name, " is a ").concat(file_ending, " file, which is not supported."));
                        }
                    }
                    else if (!line.split("as")[1].trim().includes("require")) {
                        var_name = line.split("as")[0].trim().replace("*define", "").trim();
                        var_val = line.split("as")[1].trim();
                        // Add variable definition to pool
                        this.createVariable(var_name, var_val);
                        if (!this.quietMode)
                            console.log("[LOG] Line ".concat(i, " contained a variable definition for ").concat(var_name, ", variable added to variable pool."));
                        return [2 /*return*/, i++];
                    }
                }
                // Regular definitions 
                if (!INDENT.test(contents[i]) && line.includes("=")) {
                    // Does line contain variable?
                    if (line.split("=")[1].trim().charAt(0) == "*") {
                        key = line.split("=")[0].trim();
                        var_used = line.split("=")[1].trim().replace(/\*/g, "");
                        var_value = this.getVariable(var_used);
                        parsedSJ += "\"".concat(key, "\": ").concat(this.getType(var_value), ",\n");
                        return [2 /*return*/, i++];
                    }
                    else {
                        key = line.split("=")[0].trim();
                        value = line.split("=")[1].trim();
                        parsedSJ += "\"".concat(key, "\": ").concat(this.getType(value), ",\n");
                        return [2 /*return*/, i++];
                    }
                }
                // Section definitions
                if (line.trim().slice(-1) === ":") {
                    jump = i;
                    section_name = line.trim().replace(":", "");
                    section_1 = [];
                    // Capture our section, stop when indenting stops
                    while (INDENT.test(contents[jump])) {
                        section_1.push({ "key": contents[jump].split("=")[0].trim(), "value": contents[jump].split("=")[1].trim() });
                        jump++;
                    }
                    if (!this.quietMode)
                        console.log("[LOG] Loop captured section \"".concat(section_name, "\""));
                    parsedSJ += "\"".concat(section_name, "\": {\n");
                    no_comma_1 = 1;
                    section_1.forEach(function (kv) {
                        if (no_comma_1 == section_1.length) {
                            parsedSJ += "  \"".concat(kv.key, "\": ").concat(_this.getType(kv.value), "\n");
                        }
                        else {
                            parsedSJ += "  \"".concat(kv.key, "\": ").concat(_this.getType(kv.value), ",\n");
                            no_comma_1++;
                        }
                    });
                    parsedSJ += "},\n";
                    return [2 /*return*/, i++];
                }
                return [2 /*return*/];
            });
        }); });
        parsedSJ += "}";
        // Remove trailing comma
        var trailing_comma = parsedSJ.lastIndexOf(",");
        parsedSJ = parsedSJ.slice(0, trailing_comma) + parsedSJ.slice(trailing_comma + 1);
        if (!this.quietMode)
            console.log("[LOG] All done, ended on line ".concat(i - 1, "."));
        return JSON.parse(parsedSJ);
    };
    /**
     * Get the type of a string (array, int, float, boolean)
     * @param {any} value The string of the type we need
     * @private
     * @returns {string} The inputted value converted to its proper type (array, int, float, boolean)
     */
    SJ.prototype.getType = function (value) {
        switch (value) {
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
                var arr_values_1 = value.replace("[", "").replace("]", "").split(",");
                arr_values_1.forEach(function (v) {
                    var item_index = arr_values_1.indexOf(v);
                    if (v.trim() === "none") {
                        arr_values_1.splice(item_index, 1);
                    }
                    else {
                        arr_values_1[item_index] = v.trim();
                    }
                });
                return JSON.stringify(arr_values_1);
            // String checking
            case value.match(/^[0-9]+$/) == null:
                return "\"".concat(value, "\"");
            // Float checking
            case FLOAT.test(value):
                return value;
            // Int checking
            case value.match(/^[0-9]+$/) !== null:
                return value;
            // Default to string if no type is found
            default:
                return "\"".concat(value, "\"");
        }
    };
    /**
     * Read a file and return the contents (used for variables)
     * @param {string} fileName The name of the file to be parsed
     * @private
     * @returns {string} The file contents
     */
    SJ.prototype.parseFile = function (fileName, configPath) {
        var file_ending = fileName.trim().split(".")[1];
        if (file_ending !== "txt" && file_ending !== "js")
            throw new Error("".concat(fileName, " is not supported for variable extraction."));
        var file_value;
        try {
            file_value = readFileSync(resolve(process.cwd() + "\\" + configPath + "\\" + fileName.trim()), "utf-8");
        }
        catch (err) {
            throw new Error("Unable to locate or open ".concat(fileName.trim(), "."));
        }
        return file_value.trim();
    };
    /**
     * Creates a variable in the variable pool
     * @param {string} name The variables name
     * @param {any} value The variables value
     * @private
     * @returns {void}
     */
    SJ.prototype.createVariable = function (name, value, isFile) {
        if (isFile === void 0) { isFile = false; }
        var newVar = { name: name, value: value, isFile: isFile };
        VariablePool.push(newVar);
    };
    /**
     * Get a variables value from the variable pool
     * @private
     * @returns {string} The definition of the desired variable in the pool
     */
    SJ.prototype.getVariable = function (name) {
        var var_value = VariablePool.filter(function (v) { return v.name === name; });
        if (!var_value.length) {
            return "";
        }
        else {
            return var_value[0].value;
        }
    };
    return SJ;
}());
module.exports = SJ;
