import { BeforeDelete, Handler, Next, Req, Srv} from 'cds-routing-handlers';
import {Service} from 'typedi';
import cds,{Request} from '@sap/cds'
import { SanitizedEntity } from '../../../srv/model/amalisov.cuibono.bonusTranche';

@Service()
@Handler(SanitizedEntity.BonusTranche)
export class TrancheLockedHandler {
    @BeforeDelete()
    public async trancheLocked(@Srv() srv:any,@Req() req: Request, @Next() next:any): Promise<any> {
        const { BonusTranche } = cds.entities('amalisov.cuibono.bonusTranche');
        console.log('access granted!!!!!!!!!!!!!')
        const { ID }: { ID: string } = req.params as unknown as { ID: string };
        try {
            const tx = cds.transaction(req);
            const tranche = await tx.read(BonusTranche).where({ ID });

            // Check if tranche exists
            if (!tranche || tranche.length === 0) {
                return req.error(404,"Tranche not found");
            }

            // Assuming the 'status' property exists in the tranche object
            const trancheStatus = tranche[0].status; // Assuming the status is stored in the first element of the array
            if (trancheStatus === 'Locked') {
                return req.reply("This tranche is already locked");
            }
            // If not locked, proceed with the deletion
            return next();
        } catch (error) {
            console.error("Error occurred during tranche deletion:", error);
            return req.error(500,"Internal server error");
        }
    }
}
