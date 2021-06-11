const { Router } = require('express');
const uuidv4 = require('uuid').v4;
const moment = require('moment');
const { readMockFile, writeMockFile } = require('../../../util/fileHelper');
const PayPal = require('../../../client/PayPal');

const router = Router();

router.post('/paypal-transaction-complete', async (req, res) => {
    // console.log(req.body, 'COMPLETED');
    try {
        let token = await PayPal.getToken();
        let getData = await PayPal.get(
            PayPal.routeUrls.SUBSCRIPTIONS(req.body.id),
            token
        );

        console.log(getData, 'getData');

        if (getData.status === 'ACTIVE') {
            res.status(200).send({
                success: true,
                userInfo: getData,
                nextBillilngTime: moment(
                    getData.billing_info.next_billing_time
                ).format(),
            });
        } else {
            res.status(401).send({
                success: false,
                errors: 'User is not active',
            });
        }
    } catch (e) {
        console.log('errors', e.stack);
        res.sendStatus(500);
    }
});

//cancel subscription

module.exports = router;
