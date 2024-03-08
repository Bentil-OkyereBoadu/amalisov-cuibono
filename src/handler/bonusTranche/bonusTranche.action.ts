import{Handler,Action} from "cds-routing-handlers";
import {SanitizedEntity } from "srv/model/amalisov.cuibono.bonusTranche";
@Handler(SanitizedEntity.BonusTranche)
export class TrancheLocked{
    @Action('locked')
    public async lockedTranche(){
        console.log('tranche is locked');
        return 'success'
    }
}