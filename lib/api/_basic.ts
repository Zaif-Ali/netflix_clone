import clientPromise from "@/config/mongo/connection";
import { Collection, Db } from "mongodb";

const GetDataBase = async (): Promise<Db | null> => {
    try {
        const client = await clientPromise;
        const Database = client.db("Netflix")
        return Database;
    } catch (error) {
        console.error("Error connecting to the database:", error);
        return null;
    }
}

export const getMovies_Collec = async (): Promise<Collection | null> => {
    try {
        const Database = await GetDataBase();
        if (Database === null) {
            throw new Error("Error connecting to the database")
        }
        const MoviesCollection = Database.collection('Movies')

        return MoviesCollection;

    } catch (error) {
        console.error("Error connecting to the database:", error);
        return null;
    }
}

