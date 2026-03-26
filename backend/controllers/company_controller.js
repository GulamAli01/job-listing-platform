import Company from "../models/company_model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// REGISTER COMPANY
export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;

        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false,
            });
        }

        const existingCompany = await Company.findOne({ name: companyName });

        if (existingCompany) {
            return res.status(400).json({
                message: "Company already exists",
                success: false,
            });
        }

        const company = await Company.create({
            name: companyName,
            userId: req.id,
        });

        return res.status(201).json({
            message: "Company registered successfully",
            company,
            success: true,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};


// GET ALL COMPANIES (USER BASED)
export const getCompany = async (req, res) => {
    try {
        const userId = req.id;

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized",
                success: false,
            });
        }

        const companies = await Company.find({ userId }).sort({ createdAt: -1 });

        return res.status(200).json({
            companies,
            success: true,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};


// GET COMPANY BY ID
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;

        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false,
            });
        }

        return res.status(200).json({
            company,
            success: true,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};


// UPDATE COMPANY
export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;

        const file = req.file;
        let logo;

        // upload logo to cloudinary
        if (file) {
            try {
                const fileUri = getDataUri(file);
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
                logo = cloudResponse.secure_url;
            } catch (uploadError) {
                console.error("Cloudinary upload failed:", uploadError);
                return res.status(500).json({
                    message: "Logo upload failed",
                    success: false,
                });
            }
        }

        const updateData = {
            ...(name && { name }),
            ...(description && { description }),
            ...(website && { website }),
            ...(location && { location }),
            ...(logo && { logo }),
        };

        const company = await Company.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Company updated successfully",
            company,
            success: true,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};