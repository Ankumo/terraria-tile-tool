import { WorldFileWorkerInMessage, WorldFileWorkerOutMessage } from './types';
import { WorldFile } from './worldFile';

let wf = new WorldFile(new File([new Blob()], ''));

const w: Worker = self as any;

const postMessage = (data: WorldFileWorkerOutMessage) => w.postMessage(data);

w.addEventListener(
    'message',
    async (e: MessageEvent<WorldFileWorkerInMessage>) => {
        switch (e.data.type) {
            case 'init':
                wf = new WorldFile(e.data.payload);
                const payload = await wf.load();

                postMessage({
                    type: 'loaded',
                    payload,
                });
                break;
            case 'process':
                try {
                    await wf.process(e.data.payload, (payload) => {
                        postMessage({
                            type: 'progress',
                            payload,
                        });
                    });

                    postMessage({
                        type: 'done',
                        payload: undefined,
                    });
                } catch (err) {
                    postMessage({
                        type: 'error',
                        payload: err as any,
                    });
                }
                break;
            case 'save':
                postMessage({
                    type: 'save',
                    payload: wf.save(),
                });
                break;
            case 'saveBackup':
                postMessage({
                    type: 'saveBackup',
                    payload: wf.saveBackup(),
                });
                break;
        }
    },
);
