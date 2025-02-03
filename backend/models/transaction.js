import mongoose from "mongoose";
import { mongo, Schema } from "mongoose";


const TransactionSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    order:{
        type:mongoose.Schema.Types.ObjectId,   
        ref:'Order',
    },
    paymentId:{
        type:String,
        required:true
    },
    ordertId:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:[
            'Pending',
            'Success',
            'Failed'
        ],
        default:'Pending',
        required: true,
    },
    amount:{
        type:Number,
        required:true
    } ,   
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Transaction = mongoose.model("Transaction",TransactionSchema);    
export default Transaction;