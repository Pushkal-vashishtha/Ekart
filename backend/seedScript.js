import dotenv from 'dotenv';
import mongoose,{Types} from 'mongoose';
import Product from './models/product.js';
import Category from './models/category.js';
import { categoriesData,productData } from './seedData.js';

dotenv.config();

async function seedDatabase() {
    try{
        await mongoose.connect(process.env.MONGO_URI);

        await Product.deleteMany({});
        await Category.deleteMany({});  

        const categoryDocs= await Category.insertMany(categoriesData);

         
        const categoryMap= categoryDocs.reduce((map,category)=>{
            map[category.name]=category._id.toString();
            return map;
        },{});  

        const productWithCategoryIds = productData.map((product)=>({
            ...product,
            category:categoryMap[product.category],
            
        }))
        await Product.insertMany(productWithCategoryIds);

        console.log('seeding database successfully');
    }catch(error){
        console.log("error seeding database",error);
    }finally{
        mongoose.connection.close();
    }
}

seedDatabase();
