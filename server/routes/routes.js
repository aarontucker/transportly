import { sortOrders, findFlight } from './route_helpers.js';
const express = require('express');
/* eslint-disable new-cap */
const router = express.Router();
const schedule = require('../../data/schedule.json');
const orders = require('../../data/orders.json');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/getScheduleDays', (req, res) => {
    const uniqueDays = [];
    schedule.forEach((flight) => {
        if (!uniqueDays.includes(flight.day)) {
            uniqueDays.push(flight.day);
        }
    });
    res.json(uniqueDays);
});

router.get('/getScheduleByDay', (req, res) => {
    const day = parseInt(req.query.day, 10);
    const filteredSchedule = schedule.filter((flight) => flight.day === day);
    res.json(filteredSchedule);
});

router.get('/getOrders', (req, res) => {
    const capacity = 20;
    const departureCity = 'YUL'; // Constant since all flights originate here

    // Sort the orders with destination as the key to make comparisons to the schedule simple
    const sortedOrders = sortOrders(orders);

    // Add initial capacity to the schedule (consider making this a part of the initial schedule data)
    schedule.forEach((schedule) => {
        schedule.capacity = capacity;
    });

    const orderOutput = [];
    // Loop through each destination
    for (const destination in sortedOrders) {
        // Create an array of indices in the schedule for the selected destination so that we only have to search the schedule array once
        const destinationIndices = [];
        schedule.forEach((schedule, i) => {
            if (schedule.arrival_city === destination) {
                destinationIndices.push(i);
            }
        });

        // Loop through each order for the current destination to find the proper flight
        sortedOrders[destination].forEach((order) => {
            // Find the first available flight for the current destination
            const flight = findFlight(destinationIndices, schedule);
            const orderWithFlight = {
                order,
                arrival_city: destination,
                departure_city: departureCity,
                ...flight,
            };

            orderOutput.push(orderWithFlight);
        });
    }

    res.json(orderOutput);
});


module.exports = router;
