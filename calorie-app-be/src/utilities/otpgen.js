
module.exports.genOTP = (num = 4) => {
    //return a default 4 digit numric OTP;
    const otp =  Math.random().toFixed(num).substr(`-${num}`);
    return otp;
}