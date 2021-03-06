'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from "fs";
import * as path from "path";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "t" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        let contents = `
        {
            "version": "0.2.0",
            "configurations": [
                {
                    "name": "Launch Extension",
                    "type": "extensionHost",
                    "request": "launch",
                    "runtimeExecutable": "node"
                    
                }
            ]
        }
        `;

         
        let vsCodeFolder = path.join(vscode.workspace.rootPath, '.vscode')
        let launchFile = path.join(vsCodeFolder, '/launch.json');

        if (!fs.existsSync(vsCodeFolder)) {
            fs.mkdirSync(vsCodeFolder);
        }                
        fs.writeFileSync(launchFile, contents, {encoding: 'utf-8'});

        vscode.workspace.openTextDocument(launchFile)
            .then(d => vscode.window.showTextDocument(d))
            .then(() => {
                let configurations = vscode.workspace.getConfiguration("launch").get("configurations");
                vscode.window.showInformationMessage('typeof configurations, expected: object, actual: ' + (typeof configurations));
            });
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}