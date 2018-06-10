
export const aggregateBy = key => items => 
    items.reduce((acc, item) => {
        if(!item[key]) 
            return acc
        if (!acc[item[key]]) {
            acc[item[key]] = [item]
        } else {
            acc[item[key]].push(item)
        }
        return acc;
    }, {});

export const toArray = obj => 
    Object.keys(obj).map(key => obj[key]);

export const resumeAggregate = agg => 
    Object.keys(agg).map(type => ({
        name: type,
        count: agg[type].length
    }));