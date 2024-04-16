export function fiscalYear(startDate:string, endDate:string){
    const start = new Date(startDate)
    const end = new Date(endDate)

    const fiscalYearStart = new Date(start.getMonth() >= 9 ? start.getFullYear() : start.getFullYear() - 1,9,1);
    const fiscalYearEnd = new Date(fiscalYearStart.getFullYear() + 1 , 8,30);
   
    if(start >= fiscalYearStart &&start <= fiscalYearEnd){
        return fiscalYearStart.getFullYear()
    }else if(end >= fiscalYearStart && end <= fiscalYearEnd){
       return fiscalYearStart.getFullYear()
    }else if(start < fiscalYearStart){
        return fiscalYearStart.getFullYear() -1
    }else{
        return fiscalYearStart.getFullYear()
    }
}