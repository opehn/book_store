const { dbAccess } = require('../data');
const { user } = dbAccess;

const join = async function join(email, password) {
    let result = user.getUserByEmail(email);
    try {
        if (result.length) {
            return ({});
        } else {

            console.log('here');
            /*         const res = insertNewUser(email, password);
                    if (res)
                        res.status(200).json({ message: "가입을 환영합니다" });
                    else
                        res.status(500).json({ message: "DB insert error" }); */
        }
    } catch (e) {
        throw (e);
    }
}

join('anna951', 1234);