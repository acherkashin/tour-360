import { hash, compare } from 'bcrypt';
import { Types } from 'mongoose';
import { User, UserModel } from './../models';

export class UserRepository {
    async createUser(userOptions: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }) {
        return await new Promise<User>((resolve, reject) => {
            hash(userOptions.password, 10, (err, hash) => {
                if (err) {
                    // return res.status(INTERNAL_SERVER_ERROR).json({ error: err });
                    reject(err);
                }

                const user = new UserModel({
                    _id: new Types.ObjectId(),
                    email: userOptions.email,
                    firstName: userOptions.firstName,
                    lastName: userOptions.lastName,
                    password: hash
                });

                return user.save().then(resolve);
            })
        });
    }
}
