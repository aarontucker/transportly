import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/server.js';


chai.use(chaiHttp);
let should = chai.should();
chai.expect();

// These tests miss a lot of useful cases because the data is predefined
// Changing the routes to accept a json file instead of auto importing would open the door to more realistic tests
describe("Schedules", () => {
    describe("getScheduleDays", () => {
        it("should return an array with the expected days", (done) => {
            chai.request(app)
                .get('/getScheduleDays')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.should.deep.equal([1, 2]);
                    done();
                });
        });
    });

    describe("getScheduleByDay", () => {
        it("should return the schedule for day 1", (done) => {
            const expectedOutput = [
                {
                    "flight_number": 1,
                    "departure_city": "YUL",
                    "arrival_city": "YYZ",
                    "day": 1
                },
                {
                    "flight_number": 2,
                    "departure_city": "YUL",
                    "arrival_city": "YYC",
                    "day": 1
                },
                {
                    "flight_number": 3,
                    "departure_city": "YUL",
                    "arrival_city": "YVR",
                    "day": 1
                },
            ]
            chai.request(app)
                .get('/getScheduleByDay?day=1')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.should.deep.equal(expectedOutput);
                    done();
                });
        });

        it("should return the schedule for day 2", (done) => {
            const expectedOutput = [
                {
                    "flight_number": 4,
                    "departure_city": "YUL",
                    "arrival_city": "YYZ",
                    "day": 2
                },
                {
                    "flight_number": 5,
                    "departure_city": "YUL",
                    "arrival_city": "YYC",
                    "day": 2
                },
                {
                    "flight_number": 6,
                    "departure_city": "YUL",
                    "arrival_city": "YVR",
                    "day": 2
                },
            ]
            chai.request(app)
                .get('/getScheduleByDay?day=2')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.should.deep.equal(expectedOutput);
                    done();
                });
        });
    });
});

describe("Orders", () => {
    describe("getOrders", () => {
        let response;

        before(async () => {
            response = await chai.request(app).get('/getOrders');
        });

        it("should have the proper response", () => {
            response.should.have.status(200);
            response.body.should.be.a('array');
        });

        it("should return flight 1 for order-001", () => {
            const flight = response.body.find(({ order }) => order === 'order-001').flight_number;
            flight.should.equal(1);
        });
        it("should return flight 4 for order-021", () => {
            const flight = response.body.find(({ order }) => order === 'order-021').flight_number;
            flight.should.equal(4);
        });
        it("should return flight 2 for order-035", () => {
            const flight = response.body.find(({ order }) => order === 'order-035').flight_number;
            flight.should.equal(2);
        });
        it("should return no flight for order-049", () => {
            const flight = response.body.find(({ order }) => order === 'order-049').flight_number;
            should.equal(flight, undefined);
        });
    });
})
