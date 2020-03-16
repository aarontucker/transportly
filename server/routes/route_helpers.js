export const sortOrders = (orders) => {
    const sortedOrders = {};
    for (const order in orders) {
        if (sortedOrders.hasOwnProperty(orders[order].destination)) {
            sortedOrders[orders[order].destination].push(order);
        }
        else {
            sortedOrders[orders[order].destination] = [ order ];
        }
    }

    return sortedOrders;
};

export const findFlight = (indices, schedule) => {
    let i = 0;
    while (i < indices.length) {
        // Find the first available flight with capacity and decrement the remaining capacity before returning it
        if (schedule[indices[i]].capacity > 0) {
            schedule[indices[i]].capacity -= 1;
            return schedule[indices[i]];
        }

        i++;
    }

    // If there are no flights with capacity remaining, return null
    return null;
};
