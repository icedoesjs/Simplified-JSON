// Random filler code below, variable used in example is shown with comments around it.
const time = `NOW`;


class NodeLogger {
    constructor(logpath) {
        this.logpath = logpath;
        this.error = `${time} ` + ' !'
        this.normal = `${time} ` + ' 👍'
        this.warn = `${time} ` + ' ⚠'
        this.debug = `${time} ` + ' 🐛';
        this.ready = `${time} ` + ' 🤖';
        this.success = `${time} ` + ' ✅';
        this.perms = `${time} ` + ' 🛠'
        this.nodeexc = `${time} ` + ' ⚡';
        this.noderejc = `${time} ` + ' ⚡';
        this.custom = `${time} ` + ' ✨';
        this.types = ["error", "log", "warn", "debug", "ready", "success", "perms", "nodeexc", "noderejc"];
        this.logfile = true;
    }

    async log(content, type = "log", path = "Unknown", mtd) {
        mtd = " " + mtd
        if (!this.types.includes(type.toLowerCase())) {
            this.custom = this.custom.replace("PLACEHOLDER", type.toLocaleUpperCase());
            type = this.custom;
        }
        if (content.toString().includes("Cannot send messages to this user")) {
            console.log(this.perms + "Cannot send message to this user.");
            if (this.logfile) {
                this.invokeLog(path, type, content, time)
            }
        }
        if (content.toString().includes("Missing Permissions")) {
            console.log(this.perms + "Missing permissions to execute an action.");
            if (this.logFile) {
                this.invokeLog(path, type, content, time)
            }
        }

        if (type == this.custom) {
            this.invokeLog(path, type, content, time)
            return console.log(this.custom + mtd);
        }

        switch(type.toLowerCase()) {
            case "log": 
            {
                this.invokeLog(path, type, content, time)
                return console.log(this.normal + mtd)
            }
            case "warn": 
            {
                this.invokeLog(path, type, content, time)
                return console.log(this.warn + mtd)
            }
            case "error": 
            {
                this.invokeLog(path, type, content, time)
                return console.log(this.error + mtd)
            }
            case "debug": 
            {
                this.invokeLog(path, type, content, time)
                return console.log(this.debug + mtd)
            }
            case "ready": 
            {
                this.invokeLog(path, type, content, time)
                return console.log(this.ready + mtd)
            }
            case "success": 
            {
                this.invokeLog(path, type, content, time)
                return console.log(this.success + mtd);
            }
            case "nodeexc": {
                this.invokeLog(path, type, content, time)
                return console.log(this.nodeexc + mtd);
            }
            case "noderejc": {
                this.invokeLog(path, type, content, time)
                return console.log(this.noderejc + mtd)
            }
            default: throw new TypeError(`Logger type must be specified or otherwise declared [error, log, warn, debug, ready, success, nodeexc, noderejc]`)
        }
    }
    async invokeLog(type, path, content) {
        // !! Variable used in example config below.
        var variable_to_use = "This is my variable definition"
        const logObj = {
            "path": path,
            "type": type,
            "message": content,
            "time": `NOW`
        }

        switch(type) {
            case "error":
                {
                    return JSON.stringify(logObj) + "\n----------- END LOG ------\n\n"
                }
            case "log": {
                return JSON.stringify(logObj) + "\n----------- END LOG ------\n\n"
            }
            case "nodeexc": {
                return JSON.stringify(logObj) + "\n----------- END LOG ------\n\n"
            }
            case "noderejc": {
                return JSON.stringify(logObj) + "\n----------- END LOG ------\n\n"
            }
            default: 
                return JSON.stringify(logObj) + "\n----------- END LOG ------\n\n"
        }
    }
}

module.exports = NodeLogger