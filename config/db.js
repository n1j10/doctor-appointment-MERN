import mongoose from "mongoose";
import dns from "node:dns";

// const FALLBACK_DNS_SERVERS = ["8.8.8.8", "1.1.1.1"];

const shouldRetryWithDnsFallback = (error) => {
    const message = error?.message || "";
    return message.includes("querySrv ECONNREFUSED");
};

const connectDB = async()=>{
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is missing in environment variables.");
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 });
        console.log("mongoDB connected successfully");
        return;
    } catch (error) {
        if (!shouldRetryWithDnsFallback(error)) {
            throw error;
        }
    }

    const customDnsServers = process.env.DNS_SERVERS
        ? process.env.DNS_SERVERS.split(",").map((server) => server.trim()).filter(Boolean)
        : FALLBACK_DNS_SERVERS;

    dns.setServers(customDnsServers);
    console.warn(`MongoDB SRV lookup failed with default DNS. Retrying with DNS servers: ${customDnsServers.join(", ")}`);

    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 });
    console.log("mongoDB connected successfully");
}


export default connectDB;
