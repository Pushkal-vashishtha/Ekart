import {MMKV} from 'react-native-mmkv'

const storeage= new MMKV()

const reduxStorage = {
    setItem:(key:string, val:any)=>{
        storeage.set(key,val);
        return Promise.resolve(true)
    },
    getItem:(key:string)=>{
        const value= storeage.getString(key);
        return Promise.resolve(value)
    },
    removeItem:(key:string)=>{
        storeage.delete(key);
        return Promise.resolve(true)
    },

}

export default reduxStorage