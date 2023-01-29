import { Duties_db } from "../models/duty.js";
import { seed } from "./seed.js";

async function feedDatabase() {
  try {
    await Duties_db.getInstance().sync();
    const dutyInstances = await Duties_db.getInstance().findAll();
    if (!dutyInstances || dutyInstances.length === 0) {
      seed.forEach(async (duty) => {
        await Duties_db.getInstance().create(duty);
      });
    }
  } catch (error) {
    console.error(error);
  }
}

export const db_feed = feedDatabase;
