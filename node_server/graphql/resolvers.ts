import { Op } from "sequelize";
import { Duties_db } from "../models/duty.js";

const resolvers = {
  Query: {
    async getDuties() {
      const duties = await Duties_db.getInstance().findAll();
      if (!duties) return [];
      return duties;
    },
  },
  Mutation: {
    async addDuty(parent: any, args: any, contextValue: any, info: any) {
      try {
        const foundDuty = await Duties_db.getInstance().findOne({
          where: { id: args.duty.id },
        });
        if (!foundDuty) {
            await Duties_db.getInstance().create(args.duty);
        };
        return await Duties_db.getInstance().findAll();
      } catch (error) {
        console.error(error);
      }
    },
    async updateDuty(parent: any, args: any, contextValue: any, info: any) {
      try {
        const foundDuty = await Duties_db.getInstance().findOne({
          where: { id: args.duty.id },
        });
        if (!foundDuty) return ["Item not found."];
        foundDuty.set({ name: args.duty.name, id: args.duty.id });
        await foundDuty.save();
        return await Duties_db.getInstance().findAll();
      } catch (error) {
        console.error(error);
      }
    },
    async removeDuties(parent: any, args: any, contextValue: any, info: any) {
      try {
        const duties = args.duties;
        duties.forEach(async (duty: any) => {
          const foundDuty = await Duties_db.getInstance().findOne({
            where: { id: duty.id },
          });
          if (foundDuty) foundDuty.destroy();
        });
        const returnDuties = await Duties_db.getInstance().findAll({
          where: {
            id: {
              [Op.not]: duties.map((duty: any) => duty.id),
            },
          },
        });
        return returnDuties;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export { resolvers };
