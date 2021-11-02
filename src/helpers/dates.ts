export const generateTodaysDate = () => {
    var todaysDate: any = new Date();
    var todaysDay = todaysDate.getDate()+1;
    var todaysMonth =  todaysDate.getMonth();
    var todaysYear = todaysDate.getFullYear();

    var futureDate: any = new Date(todaysDate.getTime() + (1*24*60*60*1000));
    // console.log('futureDate', futureDate);
    var futureYear = futureDate.getFullYear();
    var futureMonth = futureDate.getMonth();
    var futureDay = futureDate.getDate();
   
    //can add date with the following also
    // futureDate = new Date(futureYear, futureMonth, futureDay, 6, 0, 0, 0);

    // console.log('todaysDate', todaysDate);
    // console.log('futureDate', futureDate);

    var localStorageTodaysDate: any = localStorage.getItem('todaysDate') || undefined;
    var localStorageFutureDate: any = localStorage.getItem('futureDate') || undefined;

    if(localStorageTodaysDate != undefined) localStorageTodaysDate = new Date(localStorageTodaysDate);
    if(localStorageFutureDate != undefined) localStorageFutureDate = new Date(localStorageFutureDate);

    // console.log('localStorageTodaysDate', localStorageTodaysDate);
    // console.log('localStorageFutureDate', localStorageFutureDate);

    // console.log('localStorageTodaysDate.getTime()', localStorageTodaysDate.getTime());
    // console.log('localStorageFutureDate.getTime()', localStorageFutureDate.getTime());
    // console.log('todaysDate.getTime()', todaysDate.getTime());

    if(localStorageTodaysDate==undefined) localStorage.setItem('todaysDate', todaysDate);
    if(localStorageFutureDate==undefined) localStorage.setItem('futureDate', futureDate);
    // console.log('todaysDate', todaysDate);
    // console.log('localStorageFutureDate', localStorageFutureDate);
    if(todaysDate.getTime() > localStorageFutureDate.getTime()) {
        //expired
        localStorage.setItem('todaysDate', todaysDate);
        localStorage.setItem('futureDate', futureDate);

        localStorageTodaysDate = localStorage.getItem('todaysDate') || undefined;
        localStorageFutureDate = localStorage.getItem('futureDate') || undefined;

        // console.log('localStorageTodaysDate', localStorageTodaysDate);
        // console.log('localStorageFutureDate', localStorageFutureDate);

        // console.log('Date.parse(localStorageTodaysDate)', Date.parse(localStorageTodaysDate));
        // console.log('Date.parse(localStorageFutureDate)', Date.parse(localStorageFutureDate));
    }
   
    // else {
    //     //havent expire
    // }
    
    // var futureDay = todaysDay + 6;
    // var futureMonth: any = 0; 
    // if ((todaysMonth == 12 && todaysDay < 31) || todaysMonth < 12) {
    //     futureMonth = todaysMonth;
    // }
    // else {

    // }

    // .toLocaleDateString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})
    // 10/21/2021, 11:10 PM
    // var futureDate = todaysMonth + '/' + (todaysDay + 6) + '/' + todaysYear + ', ' + '6:00 AM';

    // todaysDate = todaysDate.toLocaleDateString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});
   
  
    // console.log('localStorageTodaysDate', localStorageTodaysDate); //when it doesnt exist, it is undefined

  
    // console.log('futureDate', futureDate);

    return {
        todayDate: localStorageTodaysDate,
        expiryDate: localStorageFutureDate
    }
}

// export const generateEndDate = () => {
//     var todaysDate = localStorage.getItem('todaysDate');
// }
