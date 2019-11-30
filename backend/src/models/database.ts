import mongoose, { Connection, Types } from 'mongoose';
import { UserRepository } from "./../repositories/user-repository";
import { User, UserModel } from '.';
import { defaultAdminConfig } from "./../config";

export interface DataBaseSettings {
    readonly url: string;
}

export class DataBase {
    private connection: Connection;
    private userRepository = new UserRepository();

    constructor(private options: DataBaseSettings) { }

    async init() {
        mongoose.connect(this.options.url, { useNewUrlParser: true });
        this.connection = mongoose.connection;
        this.connection.on("error", console.error.bind(console, "MongoDB connection error:"));
        await new Promise((resolve, reject) => {
            this.connection.once("open", () => {
                console.log("connected to the database");
                resolve();
            });
        })
        await this.createAdminUser();

        return this;
    }

    private async createAdminUser() {
        await UserModel.findOne({ email: defaultAdminConfig.email }).then(async (admin) => {
            if (admin == null) {
                await this.userRepository
                    .createUser(defaultAdminConfig);
                return console.log("Admin created");
            } else {
                console.log("Admin already exists")
            }
        })
    }
}
