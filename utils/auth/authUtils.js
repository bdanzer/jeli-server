const jwt = require("jsonwebtoken");

const getAccessToken = (payload) =>
    jwt.sign({ user: payload }, process.env.JWT_SECRET_OR_KEY, {
        expiresIn: "15min",
    });

const getRefreshToken = (payload) => {
    // get all user's refresh tokens from DB
    const userRefreshTokens = mockDB.tokens.filter(
        (token) => token.userId === payload.id
    ); // check if there are 5 or more refresh tokens,
    // which have already been generated. In this case, we should
    // remove all this refresh tokens and leave only new one for security reason
    if (userRefreshTokens.length >= 5) {
        mockDB.tokens = mockDB.tokens.filter(
            (token) => token.userId !== payload.id
        );
    }
    const refreshToken = jwt.sign(
        { user: payload },
        process.env.JWT_SECRET_OR_KEY,
        {
            expiresIn: "30d",
        }
    );
    mockDB.tokens.push({
        id: uuidv1(),
        userId: payload.id,
        refreshToken,
    });
    return refreshToken;
};

/**
 * verify if token is valid
 * @param {*} token
 * @return {boolean}
 */
const isValidToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET_OR_KEY);
    } catch (error) {
        // error
        return false;
    }
};

/**
 * retrieve token from header
 * @param {*} headers
 * @return {string} token or null
 */
const retrieveToken = (headers) => {
    if (headers && headers.authorization) {
        const tokens = headers.authorization.split(" ");
        if (tokens && tokens.length === 2) {
            return tokens[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports = {
    isValidToken,
    retrieveToken,
    getAccessToken,
    getRefreshToken,
};
