const formatDate = (date) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('en-US', options);

    // إضافة th, st, nd حسب اليوم
    const day = new Date(date).getDate();
    const suffix = (day % 10 === 1 && day !== 11) ? 'st' :
        (day % 10 === 2 && day !== 12) ? 'nd' :
            (day % 10 === 3 && day !== 13) ? 'rd' : 'th';

    return `${formattedDate}${suffix}`;
};

export default formatDate;
