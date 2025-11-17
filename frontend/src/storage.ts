import AsyncStorage from '@react-native-async-storage/async-storage';


class Resource {
    
    public constructor(private name: string) { }

    public read = async (): Promise<any> => {
        const json = await AsyncStorage.getItem(this.name)
        return json ? JSON.parse(json) : null
    }

    public write = async (obj: Object): Promise<void> => {
        await AsyncStorage.setItem(this.name, JSON.stringify(obj))
    }
    
}


export class Storage {
    private static instance: Storage | null = null

    private constructor() { }

    public static getInstance = (): Storage => {
        if (!Storage.instance)
            Storage.instance = new Storage()

        return Storage.instance
    }

    public createResource = (resourceName: string): Resource => {
        return new Resource(resourceName)
    }

}
