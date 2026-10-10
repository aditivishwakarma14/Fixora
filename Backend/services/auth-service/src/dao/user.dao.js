import userModel from "../models/user.model.js";

export async function createUser({ fullName, email, password, role }) {
    return await userModel.create({ fullName, email, password, role });
}

export async function findUserByEmail(email) {
    return await userModel.findOne({ email }).select("+password");
}

export async function findUserById(userId) {
    return await userModel.findById(userId);
}

export async function findUserByIdWithPassword(userId) {
    return await userModel.findById(userId).select("+password");
}

export async function findUserByResetToken(hashedToken) {
    return await userModel.findOne({
        resetToken: hashedToken,
        resetTokenExpiry: { $gt: new Date() }
    }).select("+password +resetToken +resetTokenExpiry");
}

export async function saveResetToken(email, hashedToken, expiry) {
    return await userModel.findOneAndUpdate(
        { email },
        { resetToken: hashedToken, resetTokenExpiry: expiry },
        { returnDocument: "after" }
    );
}

export async function updateUserName(userId, fullName) {
    return await userModel.findByIdAndUpdate(
        userId,
        { fullName },
        { returnDocument: "after", runValidators: true }
    );
}
