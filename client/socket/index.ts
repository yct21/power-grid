import { Observer } from 'rxjs/Observer'
import { Observable } from 'rxjs/Observable'
import { Channel as PhoenixChannel, Socket as PhoenixSocket } from 'phoenix'

export interface Socket {
  // The real socket
  phxSocket: PhoenixSocket,

  // Events as rxjs Observables
  onOpen$: Observable<null>,
  onError$: Observable<null>, // phoenix doesn't expose error reason
  onClose$: Observable<null>,
}

export interface Channel {
  channelName: string,
  phxChannel: PhoenixChannel,

  // Events as rxjs Observables
  onOpen$: Observable<null>,
  onError$: Observable<null>,
}

// function enterChannel (socket: Socket) {

// }

export function joinChannel (socket: Socket, channelName: string): Channel {
  const phxChannel = socket.phxSocket.channel(channelName, {})
  const channelPush = phxChannel.join() // I have no idea why phoenix named it "push"

  const channelOpen$ = Observable.create((obs: Observer<null>) => {
    channelPush.receive('ok', () => { obs.next(null) })
  })

  const channelError$ = Observable.create((obs: Observer<null>) => {
    channelPush.receive('error', () => { obs.next(null) })
  })

  return {
    channelName,
    phxChannel,
    onOpen$: channelOpen$,
    onError$: channelError$,
  }
}

export function initSocket (url: string, channelName: string): Socket {
  const phxSocket = new PhoenixSocket(url)
  phxSocket.connect()

  const socketOpen$ = Observable.create((obs: Observer<null>) => {
    phxSocket.onOpen(() => { obs.next(null) })
  })

  const socketError$ = Observable.create((obs: Observer<null>) => {
    phxSocket.onError(() => {obs.next(null) })
  })

  const socketClose$ = Observable.create((obs: Observer<null>) => {
    phxSocket.onClose(() => {obs.next(null) })
  })

  return {
    phxSocket,
    onOpen$: socketOpen$,
    onError$: socketError$,
    onClose$: socketClose$,
  }
}
