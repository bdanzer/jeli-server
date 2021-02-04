const axios = require('axios');
// const querystring = require('querystring');

class PayPalService {
    static validate(body = {}) {
        console.log('called');
        return new Promise(async (resolve, reject) => {
            // Prepend 'cmd=_notify-validate' flag to the post string
            let postreq = 'cmd=_notify-validate';

            // Iterate the original request payload object
            // and prepend its keys and values to the post string
            Object.keys(body).map((key) => {
                postreq = `${postreq}&${key}=${body[key]}`;
                return key;
            });

            const options = {
                headers: {
                    'Content-Length': postreq.length,
                },
                body: postreq,
            };

            // Make a post request to PayPal
            const response = await axios.post(
                'https://ipnpb.sandbox.paypal.com/cgi-bin/webscr',
                options
            );

            // console.log('RES', response, response.data);

            resolve(true);

            // if (response.error || response.statusCode !== 200) {
            //     reject(new Error(error));
            //     return;
            // }

            // // Validate the response from PayPal and resolve / reject the promise.
            // if (resBody.substring(0, 8) === 'VERIFIED') {
            //     resolve(true);
            // } else if (resBody.substring(0, 7) === 'INVALID') {
            //     reject(new Error('IPN Message is invalid.'));
            // } else {
            //     reject(new Error('Unexpected response body.'));
            // }
        });
    }
}

class IPNController {
    static async index(req, res) {
        // Send 200 status back to PayPal
        res.status(200).send('OK');
        res.end();

        const body = req.body || {};

        console.log('body', body);

        // Validate IPN message with PayPal
        try {
            const isValidated = await PayPalService.validate(body);
            if (!isValidated) {
                console.error('Error validating IPN message.');
                return;
            }

            // IPN Message is validated!
            const transactionType = body.txn_type;
            console.log('TRANSACTION TYPE', transactionType);

            switch (transactionType) {
                case 'web_accept':
                case 'subscr_payment':
                    const status = body.payment_status;
                    const amount = body.mc_gross;
                    // Validate that the status is completed,
                    // and the amount match your expectaions.
                    break;
                case 'subscr_signup':
                case 'subscr_cancel':
                case 'subscr_eot':
                    // Update user profile
                    break;
                case 'recurring_payment_suspended':
                case 'recurring_payment_suspended_due_to_max_failed_payment':
                    // Contact the user for more details
                    break;
                default:
                    console.log(
                        'Unhandled transaction type: ',
                        transactionType
                    );
            }
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = IPNController;
