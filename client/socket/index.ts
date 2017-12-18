import { Observer } from 'rxjs/Observer'
import { Observable } from 'rxjs/Observable'
import { fromEventPattern } from 'rxjs/Observable/fromEventPattern'
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

export function joinChannel (socket: Socket, channelName: string): Channel {
  const phxChannel = socket.phxSocket.channel(channelName, {})
  const channelPush = phxChannel.join() // I have no idea why phoenix named it "push"

  const channelOpen$ = Observable.create((obs: Observer<null>) => {
    channelPush.receive('ok', () => { obs.next(null) })
  })

  const channelError$ = Observable.create((obs: Observer<null>) => {
    channelPush.receive('error', () => { obs.next(null) })
  })

  const channel = {
    channelName,
    phxChannel,
    onOpen$: channelOpen$,
    onError$: channelError$,
  }

  return channel
}

// T is the type of responsed message
export function listen$<T> (channel: Channel, event: string): Observable<T> {
  const on = (cb: (response?: T) => void ) => channel.phxChannel.on(event, cb)
  // Remove all observers when one of them gets unsubscribed
  const off = (cb: (response?: T) => void ) => channel.phxChannel.off(event)
  return fromEventPattern(on, off)
}

export function push<T> (channel: Channel, event: string, message: T) {
  channel.phxChannel.push(event, message)
}

export function initSocket (url: string, userId: string, channelName: string): Socket {
  const phxSocket = new PhoenixSocket(url, { params: { userId } })
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

  const socket = {
    phxSocket,
    onOpen$: socketOpen$,
    onError$: socketError$,
    onClose$: socketClose$,
  }

  return socket
}
