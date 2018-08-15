
const listeners = [];

export function publish(...args) {
  listeners.forEach( cb => cb(...args) );
}

export function subscribe(cb) {
  listeners.push(cb);
}

