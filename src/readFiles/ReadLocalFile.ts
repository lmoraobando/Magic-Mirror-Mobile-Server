const fs = require('fs')
const path = require('path')


class ReadLocalFile {

    private path: string = "";

    constructor(path: string = "") {
        this.path = path
    }


    public setPath(path: string) {
        this.path = path
    }


    public getpath(): string {
        return this.path
    }


    public returnFileList() {
        const directoryPath = this.path//

        fs.readdir(directoryPath, (error, files) => {
            if (error) console.log(error)
            files.forEach(file => console.log(file))
        })
    }

}

export default ReadLocalFile