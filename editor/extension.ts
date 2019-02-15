/// <reference path="../node_modules/pxt-core/built/pxteditor.d.ts" />
/// <reference path="../node_modules/pxt-core/built/pxtlib.d.ts" />


namespace pxt.editor {
    class HexRecord{
        constructor(public length: number,
            public adress: number,
            public type: number,
            public data: string,
            public crc: number) {
        }

        dataToBaseAdress() : number {
            return parseInt(this.data, 16)<<16;
        }

        dataToUint8Array(): Uint8Array{
            let res: Uint8Array = new Uint8Array(this.length);
            for (let i = 0; i < this.length; ++i) {
                res[i] = parseInt(this.data[2 * i] + this.data[2 * i + 1], 16);
            }
            return res;
        }

        dataToHexStrings(): string[] {
            let res: string[] = [];
            for (let i = 0; i < this.length; ++i) {
                res[i] = this.data[2 * i] + this.data[2 * i + 1];
            }
            return res;
        }
    }

    function hexToBinary(hexInput: string): Uint8Array {
        let hex = hexInput.split("\n");
        let output = new Uint8Array(hexInput.length - hex.length);
        let outputSize = 0;
        // Figure out what the base offset is
        let startBaseAddr = parseIHexRecord(hex[0]).dataToBaseAdress();
        let currentBaseAddr = startBaseAddr;

        for (let i = 1; i < hex.length; ++i) {
            let m = parseIHexRecord(hex[i]);
            if (!m) continue;

            if (m.type == 4) {
                currentBaseAddr = m.dataToBaseAdress();
            } else if (m.type == 0) {
                // Ensure we're padded properly.  Add "0xff" if needed to fill in gaps in the hexfile.
                while (startBaseAddr + outputSize < currentBaseAddr + m.adress) {
                    output[outputSize++] = (0xFF);

                }
                
                let data = m.dataToUint8Array();

                for (let i = 0; i < data.length; i++) {
                    output[outputSize++] = data[i];
                }
            }
        }

        pxt.log("Resulting binary is " + output.length + " bytes");
        
        return output;
    }

    function parseIHexRecord(hexLine: string): HexRecord{
        let m = /^:(..)(....)(0[012345])(.*)(..)/.exec(hexLine);
        let res : HexRecord;
        if (m) {
            res = new HexRecord(parseInt(m[1], 16),
                                parseInt(m[2], 16),
                                parseInt(m[3], 16),
                                m[4],
                                parseInt(m[5], 16));
        }
        return res;
    }

    function deployCoreAsync(resp: pxtc.CompileResult, d: pxt.commands.DeployOptions = {}): Promise<void> {
        let hexInput = resp.outfiles[pxt.outputName()];
        let binOutput = hexToBinary(hexInput);
        const fileName = resp.downloadFileBaseName + ".bin";
        
        let url = pxt.BrowserUtils.browserDownloadUInt8Array(
            binOutput,
            fileName,
            "octet/stream",
            resp.userContextWindow
        );
        
        if (!resp.success) {
            return Promise.resolve();
        }
    
        return showUploadInstructionsAsync(fileName, url, resp.confirmAsync);
        //return pxt.commands.saveOnlyAsync(resp);
    }

    function showUploadInstructionsAsync(fn: string, url: string, confirmAsync: (options: any) => Promise<number>) {
            let resolve: (thenableOrResult?: void | PromiseLike<void>) => void;
            let reject: (error: any) => void;
            const deferred = new Promise<void>((res, rej) => {
                resolve = res;
                reject = rej;
            });
            const boardName = pxt.appTarget.appTheme.boardName || "???";
            const boardDriveName = pxt.appTarget.appTheme.driveDisplayName || pxt.appTarget.compile.driveName || "???";

            // https://msdn.microsoft.com/en-us/library/cc848897.aspx
            // "For security reasons, data URIs are restricted to downloaded resources. 
            // Data URIs cannot be used for navigation, for scripting, or to populate frame or iframe elements"
            const downloadAgain = !pxt.BrowserUtils.isIE() && !pxt.BrowserUtils.isEdge();
            const docUrl = pxt.appTarget.appTheme.usbDocs;
            const saveAs = pxt.BrowserUtils.hasSaveAs();

            const htmlBody = `
            <div class="ui three column grid stackable">
                <div class="column">
                    <div class="ui">
                        <div class="content">
                            <div class="description">
                                <span class="ui blue circular label">1</span>
                                ${lf("Take the USB cable you connected to your computer. Plug it into your {0}.", boardName)}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="ui">
                        <div class="content">
                            <div class="description">
                                <span class="ui blue circular label">2</span>
                                ${lf("Press the RESET button to go into programming mode. When the lights turn green, you're ready to go.")}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="ui">
                        <div class="content">
                            <div class="description">
                                <span class="ui blue circular label">3</span>
                                ${lf("Click and drag the file you downloaded onto {0}.", boardDriveName)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

            return confirmAsync({
                header: lf("Download completed..."),
                htmlBody,
                hasCloseIcon: true,
                hideCancel: true,
                hideAgree: true,
                size: 'large',
                buttons: [downloadAgain ? {
                    label: fn,
                    icon: "download",
                    class: "lightgrey focused",
                    url,
                    fileName: fn
                } : undefined, docUrl ? {
                    label: lf("Help"),
                    icon: "help",
                    class: "lightgrey focused",
                    url: docUrl
                } : undefined]
                //timeout: 20000
            }).then(() => { });
        }

    function webUsbPairDialogAsync(confirmAsync: (options: any) => Promise<number>): Promise<number> {
        const boardName = pxt.appTarget.appTheme.boardName || "???";
        const docUrl = pxt.appTarget.appTheme.usbDocs;
        const htmlBody = `
        <div class="ui grid stackable">
            <div class="column five wide" style="background-color: #FFFFCE;">
                <div class="ui header">${lf("First time here?")}</div>
                <strong style="font-size:small">${lf("You must have version 0249 or above of the firmware")}</strong>
                <div style="justify-content: center;display: flex;padding: 1rem;">
                    <img class="ui image" src="./static/download/firmware.png" style="height:100px;" />
                </div>
                <a href="${docUrl}/webusb/troubleshoot" target="_blank">${lf("Check your firmware version here and update if needed")}</a>
            </div>
            <div class="column eleven wide">
                <div class="ui grid">
                    <div class="row">
                        <div class="column">
                            <div class="ui two column grid padded">
                                <div class="column">
                                    <div class="ui">
                                        <div class="image">
                                            <img class="ui medium rounded image" src="./static/download/connect.png" style="margin-bottom:1rem;" />
                                        </div>
                                        <div class="content">
                                            <div class="description">
                                                <span class="ui purple circular label">1</span>
                                                <strong>${lf("Connect the {0} to your computer with a USB cable", boardName)}</strong>
                                                <br />
                                                <span style="font-size:small">${lf("Use the microUSB port on the top of the {0}", boardName)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="column">
                                    <div class="ui">
                                        <div class="image">
                                            <img class="ui medium rounded image" src="./static/download/pair.png" style="margin-bottom:1rem;" />
                                        </div>
                                        <div class="content">
                                            <div class="description">
                                                <span class="ui purple circular label">2</span>
                                                <strong>${lf("Pair your {0}", boardName)}</strong>
                                                <br />
                                                <span style="font-size:small">${lf("Click 'Pair device' below and select <strong>BBC micro:bit CMSIS-DAP</strong> or <strong>DAPLink CMSIS-DAP</strong> from the list")}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

        const buttons: any[] = [];
        if (docUrl) {
            buttons.push({
                label: lf("Help"),
                icon: "help",
                className: "lightgrey",
                url: `${docUrl}/webusb`
            });
        }

        return confirmAsync({
            header: lf("Pair device for one-click downloads"),
            htmlBody,
            hasCloseIcon: true,
            agreeLbl: lf("Pair device"),
            agreeIcon: "usb",
            hideCancel: true,
            className: 'downloaddialog',
            buttons
        });
    }


    initExtensionsAsync = function (opts: pxt.editor.ExtensionOptions): Promise<pxt.editor.ExtensionResult> {
        pxt.log('loading pxt-stm32-iot-node target extensions...')
        const res: pxt.editor.ExtensionResult = {
            "webUsbPairDialogAsync" : webUsbPairDialogAsync,
            "showUploadInstructionsAsync" : showUploadInstructionsAsync,
            "deployCoreAsync": deployCoreAsync
        };
        
        pxt.commands.deployCoreAsync = deployCoreAsync;
        
        return Promise.resolve<pxt.editor.ExtensionResult>(res);
    }
}
