import e from "express";
import Category from "../models/category.js";


const getAllCategories = async (req, res) => { 
    try {
        const categories = await Category.find();
        res.status(200).json({
            success:true,
            message:"All categories fetched successfully",
            data:categories
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Failed to get all categories" ,
            error: error.message 
        }) 

    }
} 

export {getAllCategories};