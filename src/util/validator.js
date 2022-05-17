const isValid = function (value) {                                                              //validation for empty
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}
const isValid1 = function (title) {                                                              //enum validation
    return ['Mr', 'Mrs', 'Miss'].indexOf(title) !== -1
};
const isValid2 = function (name) {                                                               //validation for name
    let nameRegex = /^[a-zA-Z ]{2,}$/
    return nameRegex.test(name)
};
const isValid3 = function (phone) {                                                              //validation for phone
    let phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    return phoneRegex.test(phone)
};
const isValid4 = function (email) {                                                               //validation for email
    let emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    return emailRegex.test(email)
};
const isValid5 = function (password) {                                                            //validation for password
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/
    return passwordRegex.test(password)
};
const isValid6 = function (pincode) {                                                             //validation for pincode
    let pincodeRegex = /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/
    return pincodeRegex.test(pincode)
};
const isValid7 = function (rating) {                                                              //validation for rating
    let ratingRegex = /^[1-5]$/
    return ratingRegex.test(rating)
};
const isValid8 = function (title) {                                                               //validation  for book title
    let titleRegex = /^[a-zA-Z ]{2,45}$/
    return titleRegex.test(title)
};
const isValid9= function (ISBN) {                                                               //validation for ISBN
    let ISBNRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/
    return ISBNRegex.test(ISBN)
};

module.exports.isValid = isValid
module.exports.isValid1 = isValid1
module.exports.isValid2 = isValid2
module.exports.isValid3 = isValid3
module.exports.isValid4 = isValid4
module.exports.isValid5 = isValid5
module.exports.isValid6 = isValid6
module.exports.isValid7 = isValid7
module.exports.isValid8 = isValid8
module.exports.isValid9 = isValid9