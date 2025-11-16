import * as FileSystem from "expo-file-system"


class Resource {
    
    public constructor(private file: FileSystem.File) { }

    public read = (): any => {
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
        try {
            this.directory.create()
        } catch(error) {
            console.error(error)
        }
    }

    public static getInstance = (): Storage => {
        if (!Storage.instance)
            Storage.instance = new Storage()

        return Storage.instance
    }

    public createResource = (resourceName: string): Resource => {
        const file = new FileSystem.File(this.directory, `${resourceName}.txt`)
        try {
            file.create()
        } catch(error) {
            console.error(error)
        }
        return new Resource(file)
    }

}
