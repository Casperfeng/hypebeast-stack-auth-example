import { sign } from "jsonwebtoken";
import { User } from "./entity/User";

export const createAccessToken = (user: User) => {
    return sign({ userId: user.id}, 'asiodjioasjd4', {
        expiresIn: "60m"
    });

};

export const createRefreshToken = (user: User) => {
    return sign({ userId: user.id}, 'ewjfoiejwifwj', {
        expiresIn: "7d"
    });        
}