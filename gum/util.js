const request = require('request');
const rp = require('request-promise');
const soap = require('soap');


// Option1: Unsecure Option if node can not find the pwc cert
const specialRequest = request.defaults({ strictSSL: false })

// Option2: Secure Option add pwc cert as default
// const specialRequest = request.defaults({ agentOptions: {ca: fs.readFileSync('./pwc1.cer')}})


gumRequest = (_function, _args) => {

    _args.myCred = {
        userName: process.env.GUM_USER,
        password: process.env.GUM_PW
    }

    return soap.createClientAsync(`${process.env.GUM_URL}?wsdl`, { request: specialRequest })
        .then(client => client[`${_function}Async`](_args))
        .then(result => {
            if (result[`${_function}Result`].ReturnCode == 'Success')
                return Promise.resolve(result);
            else
                return Promise.reject(result)
        })
        .catch(err => Promise.reject(err));
}

module.exports = {

    validateUserByEmail: (_email) => {

        const args = {
            email: _email
        };

        return gumRequest('ValidateUserByEmail', args);

    },

    validateUserByGuid: (_guid) => {

        const args = {
            guid: _guid
        };

        return gumRequest('ValidateUserByGuid', args);

    },

    createUser: (_firstname, _lastname, _email, _organization, _territory) => {

        const args = {
            gmUser: {
                FirstName: _firstname,
                LastName: _lastname,
                Email: _email,
                Organization: _organization,
                Territory: _territory,
            }
        };

        return gumRequest('CreateUser', args);
    }

}