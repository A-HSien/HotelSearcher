"use strict";
const Rx_1 = require("rxjs/Rx");
const search_model_1 = require("../search.model");
function agoda($viewer, currentSearchTarget) {
    let subject = new Rx_1.Subject();
    const whoIAm = 'agoda';
    if (currentSearchTarget.name !== whoIAm) {
        console.error(`wrong proccessor!! I'm ${whoIAm} not [${currentSearchTarget.name}].`);
        return subject;
    }
    if (currentSearchTarget.searchState === search_model_1.SearchState.Waiting) {
        currentSearchTarget.searchState = search_model_1.SearchState.Searching;
        getContents(subject, $viewer, currentSearchTarget);
    }
    ;
    return subject;
}
exports.agoda = agoda;
;
function getContents(subject, $viewer, currentSearchTarget) {
    const $contents = $viewer.contents();
    const hotels = $contents.find('.hotel-item-box').toArray();
    let result = [];
    hotels.forEach(hotel => {
        hotel = $(hotel);
        const hotelName = hotel.find('.hotel-name').text();
        const price = hotel.find('.price.soft-red').text().split(',').join('');
        const area = hotel.find('.areacity-name-text').text();
        let star = 0;
        try {
            const startNumberClassName = 'ficon-star-';
            const starClasses = hotel.find('.ficon.orange-yellow').attr('class');
            const starClass = starClasses.split(startNumberClassName)[1].split(' ')[0];
            star = Number(starClass);
            star = (star >= 10) ? star / 10 : star;
        }
        catch (err) {
        }
        result.push(new search_model_1.SearchResult({
            webName: 'agoda',
            area: area,
            hotelName: hotelName,
            hotelStar: star,
            specialRank: '',
            roomTypeName: '',
            hasBreakfirst: null,
            price: Number(price)
        }));
    });
    const nextPage = $contents.find('#paginationNext');
    if (nextPage && hotels.length > 0) {
        nextPage.click();
        setTimeout(() => {
            getContents(subject, $viewer, currentSearchTarget);
        }, 5500);
    }
    else {
        currentSearchTarget.searchState = search_model_1.SearchState.Finished;
    }
    subject.next(result);
    return subject;
}
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdvZGEucHJvY2Vzc29yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWdvZGEucHJvY2Vzc29yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxnQ0FBbUM7QUFFbkMsa0RBQTBFO0FBRzFFLGVBQ0ksT0FBWSxFQUNaLG1CQUFpQztJQUlqQyxJQUFJLE9BQU8sR0FBRyxJQUFJLFlBQU8sRUFBa0IsQ0FBQztJQUU1QyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7SUFDdkIsRUFBRSxDQUFDLENBQUMsbUJBQW1CLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDdEMsT0FBTyxDQUFDLEtBQUssQ0FBQywwQkFBMEIsTUFBTSxTQUFTLG1CQUFtQixDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7UUFDckYsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRUQsRUFBRSxDQUFDLENBQUMsbUJBQW1CLENBQUMsV0FBVyxLQUFLLDBCQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUMxRCxtQkFBbUIsQ0FBQyxXQUFXLEdBQUcsMEJBQVcsQ0FBQyxTQUFTLENBQUM7UUFDeEQsV0FBVyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBQUEsQ0FBQztJQUNGLE1BQU0sQ0FBQyxPQUFPLENBQUM7QUFDbkIsQ0FBQztBQW5CRCxzQkFtQkM7QUFBQSxDQUFDO0FBRUYscUJBQ0ksT0FBZ0MsRUFDaEMsT0FBWSxFQUNaLG1CQUFpQztJQUdqQyxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDckMsTUFBTSxNQUFNLEdBQVUsU0FBUyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBRWxFLElBQUksTUFBTSxHQUFtQixFQUFFLENBQUM7SUFDaEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLO1FBRWhCLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakIsTUFBTSxTQUFTLEdBQVcsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLEVBQVksQ0FBQztRQUNyRSxNQUFNLEtBQUssR0FBVyxLQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMvRSxNQUFNLElBQUksR0FBVyxLQUFLLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFOUQsSUFBSSxJQUFJLEdBQVcsQ0FBQyxDQUFDO1FBRXJCLElBQUksQ0FBQztZQUNELE1BQU0sb0JBQW9CLEdBQVcsYUFBYSxDQUFDO1lBQ25ELE1BQU0sV0FBVyxHQUFXLEtBQUssQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0UsTUFBTSxTQUFTLEdBQVcsV0FBVyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRixJQUFJLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUUzQyxDQUNBO1FBQUEsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUViLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUNQLElBQUksMkJBQVksQ0FBQztZQUNiLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLElBQUksRUFBRSxJQUFJO1lBQ1YsU0FBUyxFQUFFLFNBQVM7WUFDcEIsU0FBUyxFQUFFLElBQUk7WUFDZixXQUFXLEVBQUUsRUFBRTtZQUNmLFlBQVksRUFBRSxFQUFFO1lBQ2hCLGFBQWEsRUFBRSxJQUFJO1lBQ25CLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ3ZCLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDbkQsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFakIsVUFBVSxDQUFDO1lBQ1AsV0FBVyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQUN2RCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFYixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixtQkFBbUIsQ0FBQyxXQUFXLEdBQUcsMEJBQVcsQ0FBQyxRQUFRLENBQUE7SUFDMUQsQ0FBQztJQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckIsTUFBTSxDQUFDLE9BQU8sQ0FBQztBQUNuQixDQUFDO0FBQUEsQ0FBQyJ9