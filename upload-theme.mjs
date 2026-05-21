const CDP_URL = 'ws://127.0.0.1:62529/devtools/browser/a36c1b63-8ff4-41d5-93fa-5c228657ef70';
const ZIP_FILE = 'c:\\Users\\Zhang\\Documents\\Halo\\WarmIsland\\dist\\warm-island-1.0.0.zip';

async function main() {
  const ws = new WebSocket(CDP_URL);
  let msgId = 1;
  const pending = new Map();

  ws.addEventListener('message', (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
  });

  const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
    const id = msgId++;
    const msg = { id, method, params };
    if (sessionId) msg.sessionId = sessionId;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify(msg));
  });

  await new Promise(r => ws.addEventListener('open', r, { once: true }));

  try {
    const { targetInfos } = await send('Target.getTargets');
    const pageTarget = targetInfos.find(t => t.type === 'page' && t.url.includes('localhost:8090'));
    if (!pageTarget) { console.error('No page target found'); process.exit(1); }

    const { sessionId } = await send('Target.attachToTarget', { targetId: pageTarget.targetId, flatten: true });

    const doc = await send('DOM.getDocument', {}, sessionId);
    const { nodeId } = await send('DOM.querySelector', { nodeId: doc.root.nodeId, selector: 'input[type="file"][accept=".zip"]' }, sessionId);

    if (!nodeId) { console.error('File input not found'); process.exit(1); }
    console.log('Found file input node:', nodeId);

    await send('DOM.setFileInputFiles', { nodeId, files: [ZIP_FILE] }, sessionId);
    console.log('File upload triggered successfully!');

    ws.close();
  } catch (err) {
    console.error('Error:', JSON.stringify(err));
    ws.close();
    process.exit(1);
  }
}

main();
