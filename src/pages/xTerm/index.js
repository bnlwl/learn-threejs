import React, { useRef, useEffect } from 'react';
import { Terminal } from 'xterm';
import { AttachAddon } from 'xterm-addon-attach';
import 'xterm/css/xterm.css';

export default () => {
  const container = useRef(null);

  useEffect(() => {
    const terminal = new Terminal();
    terminal.open(container.current);
    terminal.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');
    const websocket = new WebSocket('ws://192.168.28.40:8080/websocket/4');
    const attachAddon = new AttachAddon(websocket);
    terminal.loadAddon(attachAddon);

    terminal.prompt = () => {
      terminal.write('\r\n$ ');
    };

    terminal.onKey(({ key, domEvent }) => {
      const printable =
        !domEvent.altKey &&
        !domEvent.altGraphKey &&
        !domEvent.ctrlKey &&
        !domEvent.metaKey;
      if (domEvent.keyCode === 13) {
        terminal.prompt();
      } else if (domEvent.keyCode === 8) {
        if (terminal._core.buffer.x > 2) {
          terminal.write('\b \b');
        }
      } else if (printable) {
        terminal.write(key);
      }
    });
    return () => {
      terminal.clear();
      terminal.dispose();
    };
  }, []);

  return <div ref={container} style={{ width: 200, height: 200 }} />;
};
