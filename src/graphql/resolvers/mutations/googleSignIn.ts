async function GoogleSignIn(
    _: any,
    { googleToken },
    { headers, googleClient }
): Promise<boolean> {
    console.log(headers, process.env)
    try {
        const ticket = await googleClient.verifyIdToken({ idToken: googleToken, audience: process.env.GOOGLE_CLIENT_ID })
        const payload = ticket.getPayload()
        const userId = payload['sub']
        const email = payload['email']
        console.log('userId', userId, email)
    } catch (e) {
        throw new Error('INVALID_TOKEN')
    }
    return true;
}

export default GoogleSignIn;
