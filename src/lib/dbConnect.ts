import mongoose  from "mongoose";

type ConnectionObject = {
    isConnected?:number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if(connection.isConnected){
        console.log("Already Connected to DataBase");
        return;
    }

    try{
       const db = await mongoose.connect(process.env.MONGO_URI || '');
        console.log(db);

        connection.isConnected = db.connections[0].readyState;
        console.log("DB connected Successfully")
    }
    catch(err){
        console.log("DB connection failed");
        process.exit(1);


    }
}

export default dbConnect;

  /* import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    console.log("Already connected to database.");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI || "");
    connection.isConnected = db.connections[0].readyState;

    console.log("Database connected successfully.");
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
}

export default dbConnect;
*/