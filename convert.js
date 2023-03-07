const testTask = require('./task.json')
const fs = require('fs')
const REPLACEMENT_VARIABLES = {
    cookie: '[[@cookie]]',
    header: '[[@header]]',
    email: '[[@email]]'
}

const curlTemplate = `
curl -x pr.pyproxy.com:16666 -U pikimin1-zone-resi-region-us:Longbien1 -v 'https://www.walmart.com/orchestra/home/graphql' \\
${REPLACEMENT_VARIABLES.header}\\
 -H 'cookie': '${REPLACEMENT_VARIABLES.cookie}'\\
 --data-raw $'{"query":"query GetLoginOptions($input:UserOptionsInput!){getLoginOptions(input:$input){loginOptions{...LoginOptionsFragment}errors{...LoginOptionsErrorFragment}}}fragment LoginOptionsFragment on LoginOptions{loginId canUsePassword canUsePhoneOTP canUseEmailOTP loginPhoneLastFour signInPreference loginPreference lastLoginPreference hasRemainingFactors}fragment LoginOptionsErrorFragment on IdentityLoginOptionsError{code message}","variables":{"input":{"loginId":"${REPLACEMENT_VARIABLES.email}","loginIdType":"EMAIL"}}}'\\
 --compressed\\
 --http2
`

const deriveHeaderCookie = (cookies = []) => {
    return cookies.reduce((result, cookie) => {
        result += `${cookie.name}=${cookie.value}; `
        return result
    }, '')
}

const deriveHeader =(headers = []) => {
    return Object.entries(headers).reduce((result, [key, value]) => {
        result += ` -H '${key}: ${value}'\\\n`;
        return result
    }, '')
}

const convertTaskToCurl = (task, emal) => {
    const cookie = deriveHeaderCookie(task.cookie)
    const header = deriveHeader(task.headers)

    const result = curlTemplate.replace(REPLACEMENT_VARIABLES.header, header).replace(REPLACEMENT_VARIABLES.cookie, cookie).replace(REPLACEMENT_VARIABLES.email, emal)
    fs.writeFileSync('./result.curl', result, 'utf-8')
    console.log(result)
}

convertTaskToCurl(testTask, 'jamesngdev@gmail.com')