import * as FileSystem from "expo-file-system"


class Resource {
    
    public constructor(private file: FileSystem.File) { }

    public read = (): Object => {
        return JSON.parse(this.file.textSync())
    }

    public write = (obj: Object) => {
        this.file.write(JSON.stringify(obj))
    }
    
}


export class Storage {
    private static instance: Storage | null = null
    private directory: FileSystem.Directory

    private constructor() {
        this.directory = new FileSystem.Directory(FileSystem.Paths.document, "paniclab")
    }

    public getInstance = (): Storage => {
        if (!Storage.instance)
            Storage.instance = new Storage()

        return Storage.instance
    }

    public createResource = (resourceName: string): Resource => {
        const file = new FileSystem.File(this.directory, `${resourceName}.txt`)
        file.create()
        return new Resource(file)
    }

}
