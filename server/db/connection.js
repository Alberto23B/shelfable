import { MongoClient, ServerApiVersion } from "mongodb";

async function connection(callback) {
  const uri = process.env.ATLAS_URI || "";
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
    await client.db("TGRCluster").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfullt connected to MongoDB!"
    );
    await callback(client);
  } catch (err) {
    console.error(err);
  }

  // let db = client.db("TheGoodReads");
}

export default connection;
