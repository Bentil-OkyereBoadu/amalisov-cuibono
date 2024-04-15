import { BonusTranche } from "#cds-models/amalisov/cuibono/bonusTranche";
import { Target } from "#cds-models/amalisov/cuibono/targetAmount";
import { TrancheParticipation } from "#cds-models/amalisov/cuibono/trancheParticipation";
import cds, { Request } from "@sap/cds";


export async function updateTranche(
  ID: string,
  name: string | undefined,
  description: string | undefined,
  weight: number | undefined,
  orignDate: Date | undefined,
  startDate: Date | undefined,
  endDate: Date | undefined,
  location: string | undefined,
  targets: any[],
  bonusTranche: BonusTranche
) {
  const data = {
    name: name ? name : bonusTranche.name,
    description: description ? description : bonusTranche.description,
    weight: weight ? weight : bonusTranche.weight,
    orignDate: orignDate ? orignDate : bonusTranche.orignDate,
    startDate: startDate ? startDate : bonusTranche.startDate,
    endDate: endDate ? endDate : bonusTranche.endDate,
    location: location ? location : bonusTranche.location,
  };

  if (weight) {
    const particapant = await cds.tx(TrancheParticipation).run(
      SELECT.from(TrancheParticipation.name).where({ bonusTranche_ID: ID })
    );
    await Promise.all(
      particapant.map(async () => {
        await UPDATE(TrancheParticipation.name, { bonusTranche_ID: ID }).set({
          weight,
        });
      })
    );
  }

  await DELETE.from(Target.name).where({ bonusTranche_ID: ID });
  await Promise.all(
    targets.map(async (target: any) => {
      const { name, weight, achievement, description } = target;
      await INSERT.into(Target.name).entries({
        name,
        weight,
        achievement,
        description,
        bonusTranche_ID: ID,
      });
    })
  );

  await UPDATE(BonusTranche, ID).with({ ...data });
}