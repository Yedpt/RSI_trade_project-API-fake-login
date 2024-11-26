import bcrypt from "bcrypt";

export const encrypt = async(passwordPlain: string) => {
    const hash =await bcrypt.hash(passwordPlain, 10);
    return hash;
};

export const compare = async(passwordPlain: string, hashedPassword: string) => {
    return await bcrypt.compare(passwordPlain, hashedPassword)
}