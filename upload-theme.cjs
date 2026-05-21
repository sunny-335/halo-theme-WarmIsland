const path = require('path');

const pageCdpUrl = process.argv[2];
const filePath = process.argv[3];

async function uploadFile() {
  const ws = new WebSocket(pageCdpUrl);

  let msgId = 1;
  const pending = new Map();

  ws.addEventListener('message', function(event) {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
  });

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = msgId++;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await new Promise(resolve => ws.addEventListener('open', resolve, { once: true }));

  const docResult = await send('DOM.getDocument');
  const { nodeId } = await send('DOM.querySelector', {
    nodeId: docResult.root.nodeId,
    selector: 'input[type="file"]'
  });

  if (!nodeId) {
    console.error('File input not found');
    process.exit(1);
  }

  const absolutePath = path.resolve(filePath);
  console.log('Setting file:', absolutePath);

  await send('DOM.setFileInputFiles', {
    nodeId,
    files: [absolutePath]
  });

  console.log('File upload triggered successfully');

  await new Promise(resolve => setTimeout(resolve, 3000));
  ws.close();
}

uploadFile().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
