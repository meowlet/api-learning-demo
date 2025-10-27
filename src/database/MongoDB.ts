import { Db, MongoClient } from "mongodb";
import { DatabaseConstant } from "../common/DatabaseConstant";

export class MongoDatabase {
  private client: MongoClient | null = null;
  private database: Db | null = null;

  public async connect(): Promise<void> {
    if (!this.client) {
      this.client = await MongoClient.connect(DatabaseConstant.DATABASE_URI);
      this.database = this.client.db(DatabaseConstant.DATABASE_NAME);
      console.log("MongoDB connected successfully");
    }
  }

  public getDatabase(): Db {
    if (!this.database) {
      throw new Error("Database not connected. Call connect() first.");
    }
    return this.database;
  }

  public async close(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.database = null;
      console.log("MongoDB connection closed");
    }
  }

  public isConnected(): boolean {
    return this.client !== null && this.database !== null;
  }
}

const mongoDB = new MongoDatabase();
await mongoDB.connect();
export const database = mongoDB.getDatabase();
