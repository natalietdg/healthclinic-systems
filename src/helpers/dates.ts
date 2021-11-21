export const generateTodaysDate = () => {
    var todaysDate: any = new Date();

    var futureDate: any = new Date(todaysDate.getTime() + (1*24*60*60*1000));
   
    //can add date with the following also
    // futureDate = new Date(futureYear, futureMonth, futureDay, 6, 0, 0, 0);


    var localStorageTodaysDate: any = localStorage.getItem('todaysDate') || undefined;
    var localStorageFutureDate: any = localStorage.getItem('futureDate') || undefined;

    if(localStorageTodaysDate != undefined) localStorageTodaysDate = new Date(localStorageTodaysDate);
    if(localStorageFutureDate != undefined) localStorageFutureDate = new Date(localStorageFutureDate);

    if(localStorageTodaysDate==undefined) localStorage.setItem('todaysDate', todaysDate);
    if(localStorageFutureDate==undefined) localStorage.setItem('futureDate', futureDate);
    if(todaysDate.getTime() > localStorageFutureDate.getTime()) {
        //expired
        localStorage.setItem('todaysDate', todaysDate);
        localStorage.setItem('futureDate', futureDate);

        localStorageTodaysDate = localStorage.getItem('todaysDate') || undefined;
        localStorageFutureDate = localStorage.getItem('futureDate') || undefined;

    }

    return {
        todayDate: localStorageTodaysDate,
        expiryDate: localStorageFutureDate
    }
}