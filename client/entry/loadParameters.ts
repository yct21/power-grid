// import { Observable } from 'rxjs/Observable'
// import { of as toObservable } from 'rxjs/Observable/of'
const generate =  require('nanoid/generate')

interface Parameters {
  // user data from local storage or url query
  userId: string,
  currentGameId: string | null,

  // websocket url from webpack define plugin
  socketUrl: string,
}

// pirated from
// https://gomakethings.com/how-to-get-the-value-of-a-querystring-with-native-javascript/
function getQueryString (field: string) {
    let href = window.location.href;
    let reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
    let str = reg.exec(href);
    return str ? str[1] : null;
};

function generateUserId (): string {
  const allowSymbols =
    '0123456789' +
    'abcdefghijklmnopqrstuvwxyz' +
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const suffixLength = 21
  const userId = `User-${generate(allowSymbols, suffixLength)}`

  return userId
}

export function loadParameters (): Parameters {
  const userId =
    getQueryString('userId') ||
    localStorage.getItem('userId') ||
    generateUserId()

  const currentGameId = localStorage.getItem('currentGameId')
  const socketUrl = process.env.serverSocket as string

  const parameters: Parameters = {
    userId,
    currentGameId,
    socketUrl,
  }

  return parameters
}
