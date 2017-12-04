import { Observable } from 'rxjs/Observable'
import { of as toObservable } from 'rxjs/Observable/of'
import generate from 'nanoid/generate'

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
    var href = window.location.href;
    var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
    var string = reg.exec(href);
    return string ? string[1] : null;
};

function generateUserId (): string {
  const allowSymbols =
    "0123456789" +
    "abcdefghijklmnopqrstuvwxyz" +
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const suffixLength = 21
  const userId = `User-${generate(allowSymbols, suffixLength)}`

  return userId
}

export function loadParameters (): Observable<Parameters> {
  const userId =
    getQueryString('userId') ||
    localStorage.getItem('userId') ||
    generateUserId()

  const currentGameId = localStorage.getItem('currentGameId')
  const socketUrl = process.env.socketUrl as string

  const parameters: Parameters = {
    userId,
    currentGameId,
    socketUrl,
  }

  return toObservable(parameters)
}
