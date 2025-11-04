import jwt from "jsonwebtoken";
import adminModel from "../model/admin.model";
import bcryt from "bcrypt";

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const adminExists = await adminModel.findOne({ email });

    if (adminExists) {
      return res.status(400).json({
        success: false,
        message: "Admin already registred",
      });
    }

    const hasedPassword = await bcryt.hash(password, 10);

    const admin = await adminModel.create({
      email,
      password: hasedPassword,
    });

    return res.status(201).json({
      success: true,
      admin: {
        id: admin._id,
        email: admin.email,
        password: admin.password,
      },
      message: "Admin created successfully",
    });
  } catch (error) {
    return res.status(500).json({
        success:false,
        message:error.message
    })
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await adminModel.findOne({ email });

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Admin Not Found",
      });
    }

    const isMatch = await bcryt.compare(password, admin.password)

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_ADMIN);

    return res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        email: admin.email,
      },
      message: "Login Successfully",
    });
  } catch (error) {}
};
